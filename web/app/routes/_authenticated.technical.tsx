import { useState } from "react";
import { useTechnicalManagerAccess } from "~/features/technical/hooks/useTechnicalManagerAccess";
import { useTechnicalApprovals } from "~/features/technical/hooks/useTechnicalApprovals";
import { TechnicalApprovalsList } from "~/features/technical/components/TechnicalApprovalsList";
import { TechnicalDetailView } from "~/features/technical/components/TechnicalDetailView";
import { TechnicalFilters } from "~/features/technical/components/TechnicalFilters";
import { ApproveTechnicalDialog } from "~/features/technical/components/ApproveTechnicalDialog";
import { RequestTechnicalRevisionDialog } from "~/features/technical/components/RequestTechnicalRevisionDialog";
import { ErrorPage } from "~/components/ErrorPage";

export default function TechnicalPage() {
  const { user, userLoading, isTechnicalManager, error: userError } = useTechnicalManagerAccess();
  const {
    filteredApprovals,
    selectedApprovalId,
    setSelectedApprovalId,
    selectedApproval,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
  } = useTechnicalApprovals();
  
  const [approveModal, setApproveModal] = useState(false);
  const [revisionModal, setRevisionModal] = useState(false);

  if (userLoading) {
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
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-blue-main text-white rounded-lg hover:bg-blue-main/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!isTechnicalManager) {
    return (
      <ErrorPage
        statusCode={403}
        title="Access Denied"
        message="You don't have permission to access this page. Technical Manager role is required."
        showHomeButton={true}
        showBackButton={true}
      />
    );
  }

  return (
    <div className="flex h-screen bg-bg-secondary">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <div className="border-b border-border bg-bg-main p-4">
            <TechnicalFilters
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />
          </div>

          <div className="flex h-[calc(100vh-200px)] overflow-hidden">
            <TechnicalApprovalsList
              approvals={filteredApprovals}
              selectedApprovalId={selectedApprovalId}
              onSelectApproval={(id) => setSelectedApprovalId(id)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="flex-1 overflow-y-auto">
              {selectedApproval ? (
                <TechnicalDetailView
                  approval={selectedApproval}
                  onApprove={() => setApproveModal(true)}
                  onRequestRevision={() => setRevisionModal(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6">
                  <p className="text-text-secondary">Select a concert to view technical details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {selectedApproval && user?.id && (
        <>
          <ApproveTechnicalDialog
            isOpen={approveModal}
            onOpenChange={setApproveModal}
            concertId={selectedApproval.concertId}
            concertName={selectedApproval.concertName}
            technicalManagerId={user.id}
          />
          <RequestTechnicalRevisionDialog
            isOpen={revisionModal}
            onOpenChange={setRevisionModal}
            concertId={selectedApproval.concertId}
            concertName={selectedApproval.concertName}
          />
        </>
      )}
    </div>
  );
}

