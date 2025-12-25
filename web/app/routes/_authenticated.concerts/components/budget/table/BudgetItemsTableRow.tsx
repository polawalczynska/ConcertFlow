import type { BudgetItemResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";
import { Trash2, Edit } from "lucide-react";

interface BudgetItemsTableRowProps {
  item: BudgetItemResponse;
  onEdit: (item: BudgetItemResponse) => void;
  onDelete: (item: BudgetItemResponse) => void;
  canEdit: boolean;
}

export function BudgetItemsTableRow({ item, onEdit, onDelete, canEdit }: BudgetItemsTableRowProps) {
  return (
    <tr className="border-b border-border hover:bg-bg-secondary">
      <td className="p-2 text-sm">{item.category}</td>
      <td className="p-2 text-sm">
        <div>
          <div className="font-medium">{item.name}</div>
          {item.description && (
            <div className="text-xs text-text-secondary">{item.description}</div>
          )}
        </div>
      </td>
      <td className="p-2 text-sm text-right font-medium">
        ${item.estimatedAmount?.toLocaleString() || "0"}
      </td>
      <td className="p-2 text-sm text-center">
        {item.isMandatory ? (
          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Yes</span>
        ) : (
          <span className="text-xs text-text-secondary">No</span>
        )}
      </td>
      {canEdit && (
        <td className="p-2">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => onEdit(item)}
              className="p-1 hover:bg-bg-secondary rounded"
              title="Edit"
            >
              <Edit className="h-4 w-4 text-text-secondary" />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="p-1 hover:bg-bg-secondary rounded"
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}

