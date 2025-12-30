import { parseLocalDateTime } from "~/lib/date-utils";

interface TechnicalRevisionRequestDateProps {
  decisionDate?: string;
}

export function TechnicalRevisionRequestDate({ decisionDate }: TechnicalRevisionRequestDateProps) {
  if (!decisionDate) {
    return null;
  }

  const date = parseLocalDateTime(decisionDate);
  if (!date) {
    return null;
  }

  return (
    <div className="pt-2 border-t border-orange-200">
      <p className="text-xs text-orange-700">
        Requested on: {date.toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  );
}

