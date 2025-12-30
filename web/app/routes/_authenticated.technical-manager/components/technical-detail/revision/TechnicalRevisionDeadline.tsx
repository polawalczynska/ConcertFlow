import { parseLocalDateTime } from "~/lib/date-utils";

interface TechnicalRevisionDeadlineProps {
  deadline?: string | null;
}

export function TechnicalRevisionDeadline({ deadline }: TechnicalRevisionDeadlineProps) {
  if (!deadline) {
    return null;
  }

  const deadlineDate = parseLocalDateTime(deadline);
  if (!deadlineDate) {
    return null;
  }

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
}

