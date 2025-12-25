import { useState, useMemo } from "react";
import { Button } from "~/components/ui/Button";
import { Filter } from "lucide-react";
import { useBudgetManagerAccess } from "./_authenticated.budget-manager/hooks/useBudgetManagerAccess";
import { useBudgetApprovals } from "./_authenticated.budget-manager/hooks/useBudgetApprovals";
import { BudgetListPanel } from "./_authenticated.budget-manager/components/BudgetListPanel";
import { BudgetDetailView } from "./_authenticated.budget-manager/components/budget-detail/BudgetDetailView";
import { ApproveBudgetDialog } from "./_authenticated.budget-manager/components/approve-dialog/ApproveBudgetDialog";
import { RequestRevisionDialog } from "./_authenticated.budget-manager/components/approve-dialog/RequestRevisionDialog";
import { BudgetFilters } from "./_authenticated.budget-manager/components/BudgetFilters";
import { BudgetStats } from "./_authenticated.budget-manager/components/BudgetStats";

export default function BudgetManagerDashboard() {
  const { userLoading, isBudgetManager } = useBudgetManagerAccess();
  const {
    budgets,
    filterAndSortBudgets,
    selectedBudgetId,
    setSelectedBudgetId,
    selectedBudget,
    budgetDetails,
    budgetsLoading,
    approveMutation,
    requestRevisionMutation,
    stats,
  } = useBudgetApprovals();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("concertDate");
  const [approveModal, setApproveModal] = useState(false);
  const [revisionModal, setRevisionModal] = useState(false);

  const filteredBudgets = useMemo(() => {
    return filterAndSortBudgets(budgets, searchQuery, statusFilter, priorityFilter, sortBy);
  }, [budgets, searchQuery, statusFilter, priorityFilter, sortBy, filterAndSortBudgets]);

  if (userLoading || budgetsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!isBudgetManager) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-text-secondary">Access denied. Budget Manager role required.</p>
      </div>
    );
  }

  const handleApprove = (approvedBudget: number, itemApprovals: Array<{ itemId: number; decision: string; approvedAmount?: number }>) => {
    if (selectedBudgetId && budgetDetails) {
      approveMutation.mutate({
        concertId: selectedBudgetId,
        budgetVersion: budgetDetails.budgetVersion ?? 1,
        approvedBudget,
        itemApprovals: itemApprovals.length > 0 ? itemApprovals : undefined,
      });
      setApproveModal(false);
    }
  };

  const handleRequestRevision = (request: {
    concertId: number;
    revisionReason: string;
    requiredChanges: Array<{ itemId: number; changeReason: string }>;
    deadline: string;
  }) => {
    if (selectedBudgetId && budgetDetails) {
      requestRevisionMutation.mutate({
        concertId: request.concertId,
        revisionReason: request.revisionReason,
        requiredChanges: request.requiredChanges,
        deadline: request.deadline,
      });
      setRevisionModal(false);
    }
  };

  return (
    <div className="flex h-screen bg-bg-secondary">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <div className="border-b border-border bg-bg-main p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <BudgetStats {...stats} />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {showFilters && (
              <BudgetFilters
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />
            )}
          </div>

          <div className="flex h-[calc(100vh-180px)] overflow-hidden">
            <BudgetListPanel
              budgets={filteredBudgets}
              selectedBudgetId={selectedBudgetId}
              onSelectBudget={(id) => setSelectedBudgetId(id)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="w-1/2 overflow-y-auto">
              {selectedBudgetId && budgetDetails ? (
                <BudgetDetailView
                  budget={budgetDetails}
                  onApprove={() => setApproveModal(true)}
                  onRequestRevision={() => setRevisionModal(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6">
                  <p className="text-text-secondary">Select a budget to view details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {selectedBudgetId && (
        <>
                  <ApproveBudgetDialog
                    isOpen={approveModal}
                    onOpenChange={setApproveModal}
                    concertId={selectedBudgetId}
                    concertName={selectedBudget?.concertName ?? ""}
                    budgetVersion={budgetDetails?.budgetVersion ?? 1}
                    requestedBudget={budgetDetails?.requestedBudget}
                    budgetDetails={budgetDetails}
                    onApprove={handleApprove}
                    isLoading={approveMutation.isPending}
                  />
          <RequestRevisionDialog
            isOpen={revisionModal}
            onOpenChange={setRevisionModal}
            concertId={selectedBudgetId}
            concertName={selectedBudget?.concertName ?? ""}
            budgetVersion={budgetDetails?.budgetVersion ?? 1}
            budgetDetails={budgetDetails}
            onRequestRevision={handleRequestRevision}
            isLoading={requestRevisionMutation.isPending}
          />
        </>
      )}
    </div>
  );
}
