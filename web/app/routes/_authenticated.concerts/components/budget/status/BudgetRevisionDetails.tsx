import { parseLocalDateTime } from "~/lib/date-utils";

interface BudgetRevisionDetailsProps {
  comments: string;
}

export function BudgetRevisionDetails({ comments }: BudgetRevisionDetailsProps) {
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
}

