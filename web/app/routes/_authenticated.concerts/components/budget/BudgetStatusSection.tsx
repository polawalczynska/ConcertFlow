import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import type { BudgetDetailResponse } from "~/api";
import { parseLocalDateTime } from "~/lib/date-utils";
import { getStatusBadgeClasses, formatStatusLabel } from "~/lib/status-utils";

interface BudgetStatusSectionProps {
  budgetDetails: BudgetDetailResponse;
}

export function BudgetStatusSection({ budgetDetails }: BudgetStatusSectionProps) {

  const latestApproval = budgetDetails.approvalHistory?.[budgetDetails.approvalHistory.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Budget Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Badge className={getStatusBadgeClasses(budgetDetails.budgetStatus)}>
            {formatStatusLabel(budgetDetails.budgetStatus)}
          </Badge>
          {budgetDetails.requestedBudget && (
            <div>
              <span className="text-sm text-text-secondary">Requested: </span>
              <span className="font-semibold">${budgetDetails.requestedBudget.toLocaleString()}</span>
            </div>
          )}
          {budgetDetails.budgetStatus === "APPROVED" && budgetDetails.approvedBudget && (
            <div>
              <span className="text-sm text-text-secondary">Approved: </span>
              <span className="font-semibold text-green-700">
                ${budgetDetails.approvedBudget.toLocaleString()}
              </span>
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
                        const reason = reasonMatch && !reasonMatch.includes('Deadline:') ? reasonMatch : null;
                        
                        return (
                          <>
                            {reason && (
                              <div>
                                <p className="text-sm font-medium text-text-primary mb-1">Revision Reason:</p>
                                <p className="text-sm text-text-secondary pl-2 border-l-2 border-yellow-300">
                                  {reason}
                                </p>
                              </div>
                            )}
                            {deadline && (() => {
                              const deadlineDate = parseLocalDateTime(deadline);
                              if (!deadlineDate) return null;
                              return (
                                <div>
                                  <p className="text-sm font-medium text-text-primary mb-1">Revision Deadline:</p>
                                  <p className="text-sm font-semibold text-yellow-700">
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
              {latestApproval.decisionDate && (() => {
                const decisionDate = parseLocalDateTime(latestApproval.decisionDate);
                if (!decisionDate) return null;
                return (
                  <p className="text-xs text-text-secondary">
                    {decisionDate.toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                );
              })()}
            </div>
          </div>
        )}

        {budgetDetails.validations && budgetDetails.validations.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-text-secondary mb-2">Validations</p>
            <div className="space-y-1">
              {budgetDetails.validations.map((validation, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span
                    className={`text-xs font-medium ${
                      validation.severity === "ERROR"
                        ? "text-red-600"
                        : validation.severity === "WARNING"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {validation.severity}:
                  </span>
                  <span className="text-sm">{validation.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

