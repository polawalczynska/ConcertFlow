import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { technicalApi } from "~/lib/api-client";

interface TechnicalStatusSectionProps {
  concertId: number;
}

export function TechnicalStatusSection({ concertId }: TechnicalStatusSectionProps) {
  const { data: technicalDetails } = useQuery({
    queryKey: ["technical-requirements", concertId],
    queryFn: async () => {
      try {
        const response = await technicalApi.getTechnicalDetailsForCoordinator(concertId);
        return response.data;
      } catch (error) {
        if ((error as { response?: { status?: number } })?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!concertId,
  });

  const technicalStatus = technicalDetails?.technicalStatus || "PENDING";
  const isApproved = technicalStatus === "APPROVED";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-600";
      case "SUBMITTED":
        return "bg-blue-500";
      case "PENDING":
        return "bg-yellow-500";
      case "REVISION_REQUESTED":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "Approved";
      case "SUBMITTED":
        return "Submitted";
      case "PENDING":
        return "Pending";
      case "REVISION_REQUESTED":
        return "Revision Requested";
      default:
        return status;
    }
  };

  const latestApproval = technicalDetails?.approvalHistory?.[technicalDetails.approvalHistory.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Technical Requirements Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-text-secondary mb-1">Status</p>
            <Badge className={getStatusColor(technicalStatus)}>
              {getStatusLabel(technicalStatus)}
            </Badge>
          </div>
          {isApproved && technicalDetails?.approvedAt && (
            <div>
              <p className="text-sm text-text-secondary mb-1">Approved At</p>
              <p className="text-sm font-medium text-text-primary">
                {new Date(technicalDetails.approvedAt).toLocaleDateString()}
              </p>
            </div>
          )}
          {technicalStatus === "SUBMITTED" && technicalDetails?.submittedAt && (
            <div>
              <p className="text-sm text-text-secondary mb-1">Submitted At</p>
              <p className="text-sm font-medium text-text-primary">
                {new Date(technicalDetails.submittedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {latestApproval && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-text-secondary mb-2">Latest Response</p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Decision: </span>
                {latestApproval.decision}
              </p>
              {latestApproval.comments && (
                <div className="space-y-2">
                  {latestApproval.decision === "Returned for Revision" && (
                    <>
                      {(() => {
                        const comments = latestApproval.comments;
                        const deadlineMatch = comments.match(/Deadline:\s*(.+)/);
                        const reasonMatch = comments.split('\n')[0];
                        const deadline = deadlineMatch ? deadlineMatch[1].trim() : null;
                        const reason = reasonMatch && !reasonMatch.includes('Deadline:') && reasonMatch.includes('Revision Reason:') 
                          ? reasonMatch.replace('Revision Reason: ', '').trim() 
                          : null;
                        
                        // Extract required changes
                        const requiredChangesMatch = comments.match(/Required Changes:\s*\n((?:- .+\n?)+)/);
                        const requiredChanges = requiredChangesMatch 
                          ? requiredChangesMatch[1].split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace(/^-\s*/, '').trim())
                          : [];
                        
                        return (
                          <>
                            {reason && (
                              <div>
                                <p className="text-sm font-medium text-text-primary mb-1">Revision Reason:</p>
                                <p className="text-sm text-text-secondary pl-2 border-l-2 border-orange-300">
                                  {reason}
                                </p>
                              </div>
                            )}
                            {requiredChanges.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-text-primary mb-1">Required Changes:</p>
                                <ul className="text-sm text-text-secondary pl-2 border-l-2 border-orange-300 space-y-1">
                                  {requiredChanges.map((change, index) => (
                                    <li key={index} className="pl-2">• {change}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {deadline && (
                              <div>
                                <p className="text-sm font-medium text-text-primary mb-1">Revision Deadline:</p>
                                <p className="text-sm font-semibold text-orange-700">
                                  {new Date(deadline).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </>
                  )}
                  {latestApproval.decision !== "Returned for Revision" && latestApproval.comments && (
                    <div>
                      <p className="text-sm font-medium">Comments:</p>
                      <p className="text-sm text-text-secondary">{latestApproval.comments}</p>
                    </div>
                  )}
                </div>
              )}
              {latestApproval.decisionDate && (
                <p className="text-xs text-text-secondary">
                  {new Date(latestApproval.decisionDate).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

