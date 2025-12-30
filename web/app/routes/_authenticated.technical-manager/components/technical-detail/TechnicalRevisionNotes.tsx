import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { AlertCircle } from "lucide-react";
import type { TechnicalDetailResponse } from "~/api";

interface TechnicalRevisionNotesProps {
  technicalDetails: TechnicalDetailResponse | null | undefined;
}

export function TechnicalRevisionNotes({ technicalDetails }: TechnicalRevisionNotesProps) {
  const isRevisionRequested = technicalDetails?.technicalStatus === "REVISION_REQUESTED";
  
  if (!isRevisionRequested || !technicalDetails) {
    return null;
  }

  const revisionRequest = (technicalDetails as any)?.approvalHistory
    ?.filter((approval: any) => approval.requiresRevision || approval.decision === "Returned for Revision")
    .sort((a: any, b: any) => {
      if (!a.decisionDate || !b.decisionDate) return 0;
      return new Date(b.decisionDate).getTime() - new Date(a.decisionDate).getTime();
    })[0];

  const parseRevisionComments = (comments?: string) => {
    if (!comments) return null;
    const deadlineMatch = comments.match(/Deadline:\s*(.+)/);
    const reasonMatch = comments.split('\n')[0];
    const reason = reasonMatch && reasonMatch.includes('Revision Reason:') 
      ? reasonMatch.replace('Revision Reason: ', '').trim() 
      : reasonMatch && !reasonMatch.includes('Deadline:') ? reasonMatch : null;
    
    const requiredChangesMatch = comments.match(/Required Changes:\s*\n((?:- .+\n?)+)/);
    const requiredChanges = requiredChangesMatch 
      ? requiredChangesMatch[1].split('\n').filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.replace(/^-\s*/, '').trim())
      : [];
    
    return {
      reason,
      deadline: deadlineMatch ? deadlineMatch[1].trim() : null,
      requiredChanges,
    };
  };

  const revisionInfo = revisionRequest?.comments 
    ? parseRevisionComments(revisionRequest.comments)
    : null;

  if (!revisionInfo && !revisionRequest) {
    return null;
  }

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-orange-900">
          <AlertCircle className="h-5 w-5" />
          Revision Request Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {revisionInfo?.reason && (
          <div>
            <p className="text-sm font-semibold text-orange-900 mb-1">Revision Reason:</p>
            <p className="text-sm text-orange-800">{revisionInfo.reason}</p>
          </div>
        )}

        {revisionInfo?.requiredChanges && revisionInfo.requiredChanges.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-orange-900 mb-2">Required Changes:</p>
            <div className="space-y-2">
              {revisionInfo.requiredChanges.map((change: string, index: number) => (
                <div key={index} className="border-l-4 border-orange-400 bg-white rounded p-3">
                  <p className="text-sm text-text-primary">{change}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {revisionInfo?.deadline && (
          <div>
            <p className="text-sm font-semibold text-orange-900 mb-1">Revision Deadline:</p>
            <p className="text-sm font-medium text-orange-800">
              {new Date(revisionInfo.deadline).toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        )}

        {revisionRequest?.decisionDate && (
          <div className="pt-2 border-t border-orange-200">
            <p className="text-xs text-orange-700">
              Requested on: {new Date(revisionRequest.decisionDate).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

