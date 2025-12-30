import { useState, useMemo } from "react";
import { Card, CardContent } from "~/components/ui/Card";
import { BudgetItemFormDialog } from "./BudgetItemFormDialog";
import { DeleteBudgetItemDialog } from "./DeleteBudgetItemDialog";
import { BudgetItemsTableHeader } from "./table/BudgetItemsTableHeader";
import { BudgetItemsTableBody } from "./table/BudgetItemsTableBody";
import { BudgetItemsTableFooter } from "./table/BudgetItemsTableFooter";
import { BudgetItemsEmptyState } from "./table/BudgetItemsEmptyState";
import { useDeleteBudgetItem } from "~/hooks/useBudgetItems";
import type { BudgetItemResponse, BudgetDetailResponseBudgetStatusEnum } from "~/api";

interface BudgetItemsTableProps {
  concertId: number;
  budgetItems: BudgetItemResponse[];
  budgetStatus?: BudgetDetailResponseBudgetStatusEnum;
}

export function BudgetItemsTable({ concertId, budgetItems, budgetStatus }: BudgetItemsTableProps) {
  const [editingItem, setEditingItem] = useState<BudgetItemResponse | null>(null);
  const [deletingItem, setDeletingItem] = useState<BudgetItemResponse | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteItem = useDeleteBudgetItem(concertId);

  const isApproved = budgetStatus === "APPROVED";
  const canEdit = !isApproved;

  const handleEdit = (item: BudgetItemResponse) => {
    if (!canEdit) return;
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (item: BudgetItemResponse) => {
    if (!canEdit) return;
    setDeletingItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingItem?.id) {
      deleteItem.mutate(deletingItem.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setDeletingItem(null);
        },
      });
    }
  };

  const handleAdd = () => {
    if (!canEdit) return;
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const totalAmount = useMemo(
    () => budgetItems.reduce((sum, item) => sum + (item.estimatedAmount || 0), 0),
    [budgetItems]
  );

  return (
    <>
      <Card>
        <BudgetItemsTableHeader onAddClick={handleAdd} canEdit={canEdit} />
        <CardContent>
          {budgetItems.length === 0 ? (
            <BudgetItemsEmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-sm font-medium text-text-secondary">Category</th>
                    <th className="text-left p-2 text-sm font-medium text-text-secondary">Name</th>
                    <th className="text-right p-2 text-sm font-medium text-text-secondary">Amount</th>
                    <th className="text-center p-2 text-sm font-medium text-text-secondary">Mandatory</th>
                    {canEdit && (
                      <th className="text-center p-2 text-sm font-medium text-text-secondary">Actions</th>
                    )}
                  </tr>
                </thead>
                <BudgetItemsTableBody
                  items={budgetItems}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  canEdit={canEdit}
                  budgetStatus={budgetStatus}
                />
                <BudgetItemsTableFooter totalAmount={totalAmount} canEdit={canEdit} />
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <BudgetItemFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        concertId={concertId}
        item={editingItem}
      />

      <DeleteBudgetItemDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        item={deletingItem}
        onConfirm={handleConfirmDelete}
        isLoading={deleteItem.isPending}
      />
    </>
  );
}

