import type { BudgetDetailResponse } from "~/api";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { AlertCircle } from "lucide-react";
import { parseLocalDateTime } from "~/lib/date-utils";

interface RevisionNotesProps {
  budget: BudgetDetailResponse;
}

export function RevisionNotes({ budget }: RevisionNotesProps) {
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
  
  if (!latestRevisionRequest && budget.budgetStatus !== "REVISION_REQUESTED") {
    return null;
  }

  const isRevisionRequested = budget.budgetStatus === "REVISION_REQUESTED";
  const revisionRequest = isRevisionRequested 
    ? budget.approvalHistory
        ?.filter((approval) => approval.requiresRevision || approval.decision === "Returned for Revision")
        .sort((a, b) => {
          if (!a.decisionDate || !b.decisionDate) return 0;
          return new Date(b.decisionDate).getTime() - new Date(a.decisionDate).getTime();
        })[0]
    : latestRevisionRequest;

  const itemsWithRevisions = budget.budgetItems?.filter(
    (item) => item.notes?.includes("REVISION REQUESTED:")
  ) || [];

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

  if (!revisionRequest && revisionRequests.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-orange-900">
          <AlertCircle className="h-5 w-5" />
          {isRevisionRequested ? "Current Revision Request" : "Your Revision Request"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {revisionInfo?.reason && (
          <div>
            <p className="text-sm font-semibold text-orange-900 mb-1">Revision Reason:</p>
            <p className="text-sm text-orange-800">{revisionInfo.reason}</p>
          </div>
        )}

        {revisionInfo?.deadline && (() => {
          const deadlineDate = parseLocalDateTime(revisionInfo.deadline);
          if (!deadlineDate) return null;
          
          return (
            <div>
              <p className="text-sm font-semibold text-orange-900 mb-1">Revision Deadline:</p>
              <p className="text-sm font-medium text-orange-800">
                {deadlineDate.toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          );
        })()}

        {itemsWithRevisions.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-orange-900 mb-2">Item-Specific Revisions:</p>
            <div className="space-y-3">
              {itemsWithRevisions.map((item) => {
                const revisionDetails = parseItemRevisionNote(item.notes || "");
                return (
                  <div key={item.id} className="border-l-4 border-orange-400 bg-white rounded p-3">
                    <p className="font-medium text-sm text-text-primary mb-2">{item.name}</p>
                    {revisionDetails.reason && (
                      <div className="mb-1">
                        <span className="text-xs font-medium text-text-secondary">Reason: </span>
                        <span className="text-xs text-text-primary">{revisionDetails.reason}</span>
                      </div>
                    )}
                    {revisionDetails.suggestedAmount && (
                      <div className="mb-1">
                        <span className="text-xs font-medium text-text-secondary">Suggested Amount: </span>
                        <span className="text-xs text-text-primary font-semibold">{revisionDetails.suggestedAmount}</span>
                      </div>
                    )}
                    {revisionDetails.itemNotes && (
                      <div>
                        <span className="text-xs font-medium text-text-secondary">Notes: </span>
                        <span className="text-xs text-text-primary">{revisionDetails.itemNotes}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {revisionRequest?.decisionDate && (() => {
          const decisionDate = parseLocalDateTime(revisionRequest.decisionDate);
          if (!decisionDate) return null;
          return (
            <div className="pt-2 border-t border-orange-200">
              <p className="text-xs text-orange-700">
                Requested on: {decisionDate.toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          );
        })()}
      </CardContent>
    </Card>
  );
}

