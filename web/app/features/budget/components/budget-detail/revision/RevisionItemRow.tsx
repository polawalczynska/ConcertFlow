import type { BudgetItemResponse } from "~/api";

interface RevisionItemRowProps {
  item: BudgetItemResponse;
  revisionDetails: {
    reason?: string;
    suggestedAmount?: string;
    itemNotes?: string;
  };
}

export function RevisionItemRow({ item, revisionDetails }: RevisionItemRowProps) {
  return (
    <div className="border-l-4 border-orange-400 bg-white rounded p-3">
      <p className="font-medium text-sm text-text-primary mb-2">{item.name}</p>
      {revisionDetails.reason && (
        <div className="mb-1">
          <span className="text-xs font-medium text-text-secondary">Reason: </span>
          <span className="text-xs text-text-primary">{revisionDetails.reason}</span>
        </div>
      )}
      {revisionDetails.suggestedAmount && (
        <div className="mb-1">
          <span className="text-xs font-medium text-text-secondary">Suggested Amount: </span>
          <span className="text-xs text-text-primary font-semibold">{revisionDetails.suggestedAmount}</span>
        </div>
      )}
      {revisionDetails.itemNotes && (
        <div>
          <span className="text-xs font-medium text-text-secondary">Notes: </span>
          <span className="text-xs text-text-primary">{revisionDetails.itemNotes}</span>
        </div>
      )}
    </div>
  );
}

