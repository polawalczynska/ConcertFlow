import type { BudgetItemResponse } from "~/api";
import { RevisionItemRow } from "./RevisionItemRow";

interface RevisionItemRevisionsProps {
  items: BudgetItemResponse[];
  parseItemRevisionNote: (notes: string) => {
    reason?: string;
    suggestedAmount?: string;
    itemNotes?: string;
  };
}

export function RevisionItemRevisions({ items, parseItemRevisionNote }: RevisionItemRevisionsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-sm font-semibold text-orange-900 mb-2">Item-Specific Revisions:</p>
      <div className="space-y-3">
        {items.map((item) => {
          const revisionDetails = parseItemRevisionNote(item.notes || "");
          return (
            <RevisionItemRow
              key={item.id}
              item={item}
              revisionDetails={revisionDetails}
            />
          );
        })}
      </div>
    </div>
  );
}

