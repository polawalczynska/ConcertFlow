interface BudgetItemsTableFooterProps {
  totalAmount: number;
  canEdit: boolean;
}

export function BudgetItemsTableFooter({ totalAmount, canEdit }: BudgetItemsTableFooterProps) {
  return (
    <tfoot>
      <tr className="border-t-2 border-border font-semibold">
        <td colSpan={2} className="p-2 text-sm">
          Total
        </td>
        <td className="p-2 text-sm text-right">${totalAmount.toLocaleString()}</td>
        <td colSpan={canEdit ? 2 : 1}></td>
      </tr>
    </tfoot>
  );
}

