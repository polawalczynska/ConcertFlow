import type { BudgetApprovalDashboardResponse } from "~/api";
import { BudgetSearch } from "./budget-list/BudgetSearch";
import { BudgetCard } from "./budget-list/BudgetCard";

interface BudgetListPanelProps {
  budgets: BudgetApprovalDashboardResponse[];
  selectedBudgetId: number | null;
  onSelectBudget: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BudgetListPanel({
  budgets,
  selectedBudgetId,
  onSelectBudget,
  searchQuery,
  onSearchChange,
}: BudgetListPanelProps) {
  return (
    <div className="w-1/2 overflow-y-auto border-r border-border">
      <div className="p-4">
        <BudgetSearch searchQuery={searchQuery} onSearchChange={onSearchChange} />

        {budgets.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium text-text-primary">No budgets to review</p>
            <p className="mt-2 text-sm text-text-secondary">
              Budgets will appear here once concerts are assigned to you and their budgets are submitted for approval.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.concertId}
                budget={budget}
                isSelected={selectedBudgetId === budget.concertId}
                onClick={() => budget.concertId && onSelectBudget(budget.concertId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

