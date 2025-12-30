import type { TechnicalApproval } from "../../types/TechnicalApproval";
import { StatusBadge } from "./StatusBadge";

interface TechnicalApprovalCardHeaderProps {
  approval: TechnicalApproval;
}

export function TechnicalApprovalCardHeader({ approval }: TechnicalApprovalCardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <h3 className="font-semibold text-sm mb-1">{approval.concertName}</h3>
        <p className="text-xs text-text-secondary">{approval.artist}</p>
      </div>
      <StatusBadge status={approval.status} />
    </div>
  );
}

