import { CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";

interface BudgetItemsTableHeaderProps {
  onAddClick: () => void;
  canEdit: boolean;
}

export function BudgetItemsTableHeader({ onAddClick, canEdit }: BudgetItemsTableHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg">Budget Line Items</CardTitle>
      {canEdit && (
        <Button onClick={onAddClick} size="sm" className="bg-purple-main hover:bg-purple-main/90">
          Add Item
        </Button>
      )}
    </CardHeader>
  );
}

