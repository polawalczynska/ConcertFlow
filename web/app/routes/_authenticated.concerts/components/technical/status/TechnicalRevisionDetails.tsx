import { parseLocalDateTime } from "~/lib/date-utils";

interface TechnicalRevisionDetailsProps {
  comments: string;
}

export function TechnicalRevisionDetails({ comments }: TechnicalRevisionDetailsProps) {
  const deadlineMatch = comments.match(/Deadline:\s*(.+)/);
  const reasonMatch = comments.split('\n')[0];
  const deadline = deadlineMatch ? deadlineMatch[1].trim() : null;
  const reason = reasonMatch && !reasonMatch.includes('Deadline:') && reasonMatch.includes('Revision Reason:') 
    ? reasonMatch.replace('Revision Reason: ', '').trim() 
    : null;

  const requiredChangesMatch = comments.match(/Required Changes:\s*\n((?:- .+\n?)+)/);
  const requiredChanges = requiredChangesMatch 
    ? requiredChangesMatch[1].split('\n').filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.replace(/^-\s*/, '').trim())
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
            {requiredChanges.map((change: string, index: number) => (
              <li key={index} className="pl-2">• {change}</li>
            ))}
          </ul>
        </div>
      )}
      {deadline && (() => {
        const deadlineDate = parseLocalDateTime(deadline);
        if (!deadlineDate) return null;
        
        return (
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">Revision Deadline:</p>
            <p className="text-sm font-semibold text-orange-700">
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

