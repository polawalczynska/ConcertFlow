import { Badge } from "~/components/ui/Badge";
import type { TechnicalApproval } from "../../types/TechnicalApproval";
import { formatDateOnly, getStatusBadgeClasses, formatStatusLabel } from "~/shared/utils";

interface TechnicalHeaderProps {
  approval: TechnicalApproval;
}

export function TechnicalHeader({ approval }: TechnicalHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{approval.concertName}</h2>
        <p className="text-text-secondary">{approval.artist} • {approval.venue}</p>
        <p className="text-sm text-text-secondary">
          {formatDateOnly(approval.date)} • {approval.city}
        </p>
      </div>
      <Badge className={getStatusBadgeClasses(approval.status)}>
        {formatStatusLabel(approval.status)}
      </Badge>
    </div>
  );
}

