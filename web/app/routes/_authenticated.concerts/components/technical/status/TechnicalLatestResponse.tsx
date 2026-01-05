import { parseLocalDateTime } from "~/shared/utils";
import { TechnicalRevisionDetails } from "./TechnicalRevisionDetails";

interface TechnicalLatestResponseProps {
  latestApproval: {
    decision?: string;
    comments?: string;
    decisionDate?: string;
  };
}

export function TechnicalLatestResponse({ latestApproval }: TechnicalLatestResponseProps) {
  return (
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
              <TechnicalRevisionDetails comments={latestApproval.comments} />
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
  );
}

