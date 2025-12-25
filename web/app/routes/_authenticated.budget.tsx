import { useState, useMemo } from "react";
import { useBudgetManagerAccess } from "./_authenticated.budget-manager/hooks/useBudgetManagerAccess";
import { useBudgetApprovals } from "./_authenticated.budget-manager/hooks/useBudgetApprovals";
import { BudgetListPanel } from "./_authenticated.budget-manager/components/BudgetListPanel";
import { BudgetDetailView } from "./_authenticated.budget-manager/components/budget-detail/BudgetDetailView";
import { ApproveBudgetDialog } from "./_authenticated.budget-manager/components/approve-dialog/ApproveBudgetDialog";
import { RequestRevisionDialog } from "./_authenticated.budget-manager/components/approve-dialog/RequestRevisionDialog";
import { BudgetFilters } from "./_authenticated.budget-manager/components/BudgetFilters";
import type { BudgetItemApproval } from "~/api";

export default function ConcertsPage() {
  const { user, userLoading, isBudgetManager, error: userError } = useBudgetManagerAccess();
  const {
    budgets,
    filterAndSortBudgets,
    selectedBudgetId,
    setSelectedBudgetId,
    selectedBudget,
    budgetDetails,
    budgetsLoading,
    budgetsError,
    approveMutation,
    requestRevisionMutation,
  } = useBudgetApprovals();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("concertDate");
  const [approveModal, setApproveModal] = useState(false);
  const [revisionModal, setRevisionModal] = useState(false);

  const filteredBudgets = useMemo(() => {
    return filterAndSortBudgets(budgets, searchQuery, statusFilter, sortBy);
  }, [budgets, searchQuery, statusFilter, sortBy, filterAndSortBudgets]);

  if (userLoading || budgetsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-2">Unable to load user information</p>
          <p className="text-sm text-text-secondary mb-4">
            {userError ? "Authentication error. Please try logging out and back in." : "Please try refreshing the page."}
          </p>
          <button
            onClick={() => window.location.href = "/login"}
            className="px-4 py-2 bg-purple-main text-white rounded-lg hover:bg-purple-main/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (budgetsError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-2">Error loading budgets</p>
          <p className="text-sm text-text-secondary">Please try refreshing the page.</p>
        </div>
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

  const handleApprove = (approvedBudget: number, itemApprovals: BudgetItemApproval[]) => {
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
            <BudgetFilters
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />
          </div>

          <div className="flex h-[calc(100vh-240px)] overflow-hidden">
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
            budgetDetails={budgetDetails ?? null}
            onApprove={handleApprove}
            isLoading={approveMutation.isPending}
          />
          <RequestRevisionDialog
            isOpen={revisionModal}
            onOpenChange={setRevisionModal}
            concertId={selectedBudgetId}
            concertName={selectedBudget?.concertName ?? ""}
            budgetVersion={budgetDetails?.budgetVersion ?? 1}
            budgetDetails={budgetDetails ?? null}
            onRequestRevision={handleRequestRevision}
            isLoading={requestRevisionMutation.isPending}
          />
        </>
      )}
    </div>
  );
}
