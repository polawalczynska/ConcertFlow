import { useState, useMemo } from "react";
import { Button } from "~/components/ui/Button";
import { Filter } from "lucide-react";
import { useBudgetManagerAccess } from "./_authenticated.budget-manager/hooks/useBudgetManagerAccess";
import { useBudgetApprovals } from "./_authenticated.budget-manager/hooks/useBudgetApprovals";
import { BudgetListPanel } from "./_authenticated.budget-manager/components/BudgetListPanel";
import { BudgetDetailView } from "./_authenticated.budget-manager/components/budget-detail/BudgetDetailView";
import { ApproveBudgetDialog } from "./_authenticated.budget-manager/components/approve-dialog/ApproveBudgetDialog";
import { RejectBudgetDialog } from "./_authenticated.budget-manager/components/approve-dialog/RejectBudgetDialog";
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
    rejectMutation,
    stats,
  } = useBudgetApprovals();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("concertDate");
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [approvalComments, setApprovalComments] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionComments, setRejectionComments] = useState("");

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

  const handleApprove = () => {
    if (selectedBudgetId && budgetDetails) {
      approveMutation.mutate({
        concertId: selectedBudgetId,
        budgetVersion: budgetDetails.budgetVersion ?? 1,
        comments: approvalComments,
      });
      setApproveModal(false);
      setApprovalComments("");
    }
  };

  const handleReject = () => {
    if (selectedBudgetId && budgetDetails) {
      rejectMutation.mutate({
        concertId: selectedBudgetId,
        budgetVersion: budgetDetails.budgetVersion ?? 1,
        rejectionReason: rejectionComments || rejectionReason,
      });
      setRejectModal(false);
      setRejectionReason("");
      setRejectionComments("");
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
                  onReject={() => setRejectModal(true)}
                  onRequestRevision={() => {}}
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
            comments={approvalComments}
            onCommentsChange={setApprovalComments}
            onApprove={handleApprove}
            isLoading={approveMutation.isPending}
          />
          <RejectBudgetDialog
            isOpen={rejectModal}
            onOpenChange={setRejectModal}
            concertId={selectedBudgetId}
            concertName={selectedBudget?.concertName ?? ""}
            budgetVersion={budgetDetails?.budgetVersion ?? 1}
            rejectionReason={rejectionReason}
            onRejectionReasonChange={setRejectionReason}
            comments={rejectionComments}
            onCommentsChange={setRejectionComments}
            onReject={handleReject}
            isLoading={rejectMutation.isPending}
          />
        </>
      )}
    </div>
  );
}
