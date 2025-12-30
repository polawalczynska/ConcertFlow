import { Calendar, MapPin } from "lucide-react";
import type { TechnicalApproval } from "../../types/TechnicalApproval";

interface TechnicalApprovalCardInfoProps {
  approval: TechnicalApproval;
}

export function TechnicalApprovalCardInfo({ approval }: TechnicalApprovalCardInfoProps) {
  return (
    <>
      <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{approval.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{approval.venue}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-text-secondary">Power Requirements</span>
          <span className="font-semibold">{approval.powerRequirements} kW</span>
        </div>
      </div>
    </>
  );
}

