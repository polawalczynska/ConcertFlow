interface BudgetItemsTableFooterProps {
  totalAmount: number;
}

export function BudgetItemsTableFooter({ totalAmount }: BudgetItemsTableFooterProps) {
  return (
    <tfoot>
      <tr className="border-t-2 border-border font-semibold">
        <td colSpan={2} className="p-2 text-sm">
          Total
        </td>
        <td className="p-2 text-sm text-right">${totalAmount.toLocaleString()}</td>
        <td colSpan={2}></td>
      </tr>
    </tfoot>
  );
}

