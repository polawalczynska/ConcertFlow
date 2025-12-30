import { parseLocalDateTime } from "~/lib/date-utils";

interface RevisionReasonProps {
  reason?: string | null;
  deadline?: string | null;
}

export function RevisionReason({ reason, deadline }: RevisionReasonProps) {
  return (
    <>
      {reason && (
        <div>
          <p className="text-sm font-semibold text-orange-900 mb-1">Revision Reason:</p>
          <p className="text-sm text-orange-800">{reason}</p>
        </div>
      )}

      {deadline && (() => {
        const deadlineDate = parseLocalDateTime(deadline);
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
    </>
  );
}

