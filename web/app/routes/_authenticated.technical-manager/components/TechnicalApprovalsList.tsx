import type { TechnicalApproval } from "../types/TechnicalApproval";
import { TechnicalSearch } from "./technical-list/TechnicalSearch";
import { TechnicalApprovalCard } from "./technical-list/TechnicalApprovalCard";
import { TechnicalApprovalsEmptyState } from "./technical-list/TechnicalApprovalsEmptyState";

interface TechnicalApprovalsListProps {
  approvals: TechnicalApproval[];
  selectedApprovalId: number | null;
  onSelectApproval: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TechnicalApprovalsList({
  approvals,
  selectedApprovalId,
  onSelectApproval,
  searchQuery,
  onSearchChange,
}: TechnicalApprovalsListProps) {
  return (
    <div className="w-[30%] overflow-y-auto border-r border-border bg-bg-main">
      <div className="p-4 border-b bg-bg-secondary sticky top-0 z-10">
        <h2 className="text-lg font-semibold mb-3">Technical Approvals</h2>
        <TechnicalSearch searchQuery={searchQuery} onSearchChange={onSearchChange} />
      </div>

      <div className="p-2 space-y-2">
        {approvals.length === 0 ? (
          <TechnicalApprovalsEmptyState />
        ) : (
          approvals.map((approval) => (
            <TechnicalApprovalCard
              key={approval.id}
              approval={approval}
              isSelected={selectedApprovalId === approval.id}
              onClick={() => onSelectApproval(approval.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

