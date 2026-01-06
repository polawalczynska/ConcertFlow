import type { TechnicalDetailResponse } from "~/api";

interface TechnicalApprovalResponse {
  id?: number;
  approverName?: string;
  approverRole?: string;
  decision?: string;
  comments?: string;
  decisionDate?: string;
  approvalLevel?: number;
  requiresRevision?: boolean;
}

export function useTechnicalRevisionNotes(technicalDetails: TechnicalDetailResponse | null | undefined) {
  const isRevisionRequested = technicalDetails?.technicalStatus === "REVISION_REQUESTED";
  
  if (!isRevisionRequested || !technicalDetails) {
    return { shouldShow: false, revisionRequest: null, revisionInfo: null };
  }

  const approvalHistory = (technicalDetails as TechnicalDetailResponse & { approvalHistory?: TechnicalApprovalResponse[] })?.approvalHistory;
  
  if (!approvalHistory || approvalHistory.length === 0) {
    return { shouldShow: false, revisionRequest: null, revisionInfo: null };
  }

  const revisionRequest = approvalHistory
    .filter((approval) => approval.requiresRevision || approval.decision === "Returned for Revision")
    .sort((a, b) => {
      if (!a.decisionDate || !b.decisionDate) return 0;
      return new Date(b.decisionDate).getTime() - new Date(a.decisionDate).getTime();
    })[0];
  
  if (!revisionRequest) {
    return { shouldShow: false, revisionRequest: null, revisionInfo: null };
  }

  const parseRevisionComments = (comments?: string) => {
    if (!comments) return null;
    const deadlineMatch = comments.match(/Deadline:\s*(.+)/);
    const reason = comments.split('\n')[0];
    
    const requiredChangesMatch = comments.match(/Required Changes:\s*\n((?:- .+\n?)+)/);
    const requiredChanges = requiredChangesMatch 
      ? requiredChangesMatch[1].split('\n').filter((line) => line.trim().startsWith('-')).map((line) => line.replace(/^-\s*/, '').trim())
      : [];
    
    return {
      reason: reason && reason.includes('Revision Reason:') 
        ? reason.replace('Revision Reason: ', '').trim() 
        : reason && !reason.includes('Deadline:') ? reason : null,
      deadline: deadlineMatch ? deadlineMatch[1].trim() : null,
      requiredChanges,
    };
  };

  const revisionInfo = revisionRequest?.comments 
    ? parseRevisionComments(revisionRequest.comments)
    : null;

  return {
    shouldShow: true,
    revisionRequest,
    revisionInfo,
  };
}

