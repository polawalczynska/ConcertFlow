import type { BudgetDetailResponse, BudgetApprovalResponse } from "~/api";

export function useRevisionNotes(budget: BudgetDetailResponse) {
  const revisionRequests = budget.approvalHistory
    ?.filter((approval) => 
      (approval.requiresRevision || approval.decision === "Returned for Revision") &&
      approval.approverRole === "BUDGET_MANAGER"
    )
    .sort((a, b) => {
      if (!a.decisionDate || !b.decisionDate) return 0;
      return new Date(b.decisionDate).getTime() - new Date(a.decisionDate).getTime();
    }) || [];

  const latestRevisionRequest = revisionRequests[0];
  
  const isRevisionRequested = budget.budgetStatus === "REVISION_REQUESTED";
  const revisionRequest = isRevisionRequested 
    ? budget.approvalHistory
        ?.filter((approval) => approval.requiresRevision || approval.decision === "Returned for Revision")
        .sort((a, b) => {
          if (!a.decisionDate || !b.decisionDate) return 0;
          return new Date(b.decisionDate).getTime() - new Date(a.decisionDate).getTime();
        })[0]
    : latestRevisionRequest;

  
  const itemsWithRevisions = (budget.budgetStatus === "REVISION_REQUESTED" 
    ? budget.budgetItems?.filter(
        (item) => item.notes?.includes("REVISION REQUESTED:")
      ) 
    : []) || [];

  const parseRevisionComments = (comments?: string) => {
    if (!comments) return null;
    const deadlineMatch = comments.match(/Deadline:\s*(.+)/);
    const reason = comments.split('\n')[0];
    return {
      reason: reason && !reason.includes('Deadline:') ? reason : null,
      deadline: deadlineMatch ? deadlineMatch[1].trim() : null,
    };
  };

  const revisionInfo = revisionRequest?.comments 
    ? parseRevisionComments(revisionRequest.comments)
    : null;

  const parseItemRevisionNote = (notes: string) => {
    const details: { reason?: string; suggestedAmount?: string; itemNotes?: string } = {};
    const lines = notes.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    lines.forEach(line => {
      if (line.startsWith("Reason:")) {
        details.reason = line.substring("Reason:".length).trim();
      } else if (line.startsWith("Suggested Amount:")) {
        details.suggestedAmount = line.substring("Suggested Amount:".length).trim();
      } else if (line.startsWith("Notes:")) {
        details.itemNotes = line.substring("Notes:".length).trim();
      }
    });
    return details;
  };

  // Only show revision notes if the budget is currently in REVISION_REQUESTED status
  // Once coordinator resubmits, status changes to SUBMITTED and revision notes should not be shown
  const shouldShow = budget.budgetStatus === "REVISION_REQUESTED";

  return {
    revisionRequest,
    revisionInfo,
    itemsWithRevisions,
    isRevisionRequested,
    parseItemRevisionNote,
    shouldShow,
  };
}

