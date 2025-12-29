export function TechnicalApprovalsEmptyState() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center py-12 text-center px-4">
      <p className="text-lg font-medium text-text-primary">No technical approvals pending</p>
      <p className="mt-2 text-sm text-text-secondary">
        Technical approvals will appear here once concerts are submitted for technical review.
      </p>
    </div>
  );
}

