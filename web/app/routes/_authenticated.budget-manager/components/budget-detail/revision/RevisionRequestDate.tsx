import { parseLocalDateTime } from "~/shared/utils";

interface RevisionRequestDateProps {
  decisionDate?: string;
}

export function RevisionRequestDate({ decisionDate }: RevisionRequestDateProps) {
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

