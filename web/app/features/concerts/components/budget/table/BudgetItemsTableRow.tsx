import type { BudgetItemResponse, BudgetDetailResponseBudgetStatusEnum } from "~/api";
import { Badge } from "~/components/ui/Badge";
import { Trash2, Edit, AlertCircle } from "lucide-react";
import { formatSnakeCaseToReadable } from "~/shared/utils/formatters";

interface BudgetItemsTableRowProps {
  item: BudgetItemResponse;
  onEdit: (item: BudgetItemResponse) => void;
  onDelete: (item: BudgetItemResponse) => void;
  canEdit: boolean;
  budgetStatus?: BudgetDetailResponseBudgetStatusEnum;
}

interface RevisionDetails {
  reason?: string;
  suggestedAmount?: string;
  notes?: string;
}

function parseRevisionNotes(notes: string | null | undefined): RevisionDetails | null {
  if (!notes || !notes.includes("REVISION REQUESTED")) {
    return null;
  }

  const revisionSection = notes.split("REVISION REQUESTED:")[1];
  if (!revisionSection) return null;

  const details: RevisionDetails = {};
  
  const reasonMatch = revisionSection.match(/Reason:\s*(.+?)(?:\n|$)/);
  if (reasonMatch) {
    details.reason = reasonMatch[1].trim();
  }

  const suggestedMatch = revisionSection.match(/Suggested Amount:\s*\$?(.+?)(?:\n|$)/);
  if (suggestedMatch) {
    details.suggestedAmount = suggestedMatch[1].trim();
  }

  const notesMatch = revisionSection.match(/Notes:\s*(.+?)(?:\n\n|\n$|$)/s);
  if (notesMatch) {
    details.notes = notesMatch[1].trim();
  }

  return Object.keys(details).length > 0 ? details : null;
}

export function BudgetItemsTableRow({ item, onEdit, onDelete, canEdit, budgetStatus }: BudgetItemsTableRowProps) {
  const revisionDetails = parseRevisionNotes(item.notes);
  const hasRevision = budgetStatus !== "APPROVED" && revisionDetails !== null;

  return (
    <tr className={`border-b border-border hover:bg-bg-secondary ${hasRevision ? 'bg-yellow-50' : ''}`}>
      <td className="p-2 text-sm">{item.category ? formatSnakeCaseToReadable(item.category) : ""}</td>
      <td className="p-2 text-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="font-medium">{item.name}</div>
            {hasRevision && (
              <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                <AlertCircle className="h-3 w-3 mr-1" />
                Revision Required
              </Badge>
            )}
          </div>
          {item.description && (
            <div className="text-xs text-text-secondary">{item.description}</div>
          )}
          {hasRevision && revisionDetails && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs space-y-1">
              {revisionDetails.reason && (
                <div>
                  <span className="font-medium text-yellow-900">Reason: </span>
                  <span className="text-yellow-800">{revisionDetails.reason}</span>
                </div>
              )}
              {revisionDetails.suggestedAmount && (
                <div>
                  <span className="font-medium text-yellow-900">Suggested Amount: </span>
                  <span className="text-yellow-800 font-semibold">${parseFloat(revisionDetails.suggestedAmount).toLocaleString()}</span>
                </div>
              )}
              {revisionDetails.notes && (
                <div>
                  <span className="font-medium text-yellow-900">Notes: </span>
                  <span className="text-yellow-800">{revisionDetails.notes}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </td>
      <td className="p-2 text-sm text-right font-medium">
        <div className="space-y-1">
          <div>${item.estimatedAmount?.toLocaleString() || "0"}</div>
          {hasRevision && revisionDetails?.suggestedAmount && (
            <div className="text-xs text-yellow-700 font-semibold">
              Suggested: ${parseFloat(revisionDetails.suggestedAmount).toLocaleString()}
            </div>
          )}
        </div>
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

