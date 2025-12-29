import type { TechnicalApproval } from "../data/mockTechnicalApprovals";
import { TechnicalHeader } from "./technical-detail/TechnicalHeader";
import { TechnicalSummaryCards } from "./technical-detail/TechnicalSummaryCards";
import { TechnicalTabs } from "./technical-detail/TechnicalTabs";
import { TechnicalActionButtons } from "./technical-detail/TechnicalActionButtons";

interface TechnicalDetailViewProps {
  approval: TechnicalApproval;
  onApprove: () => void;
  onRequestRevision: () => void;
}

export function TechnicalDetailView({
  approval,
  onApprove,
  onRequestRevision,
}: TechnicalDetailViewProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <TechnicalHeader approval={approval} />
        <TechnicalSummaryCards approval={approval} />
      </div>

      <TechnicalTabs approval={approval} />

      <TechnicalActionButtons
        approval={approval}
        onApprove={onApprove}
        onRequestRevision={onRequestRevision}
      />
    </div>
  );
}

