import { Badge } from "~/components/ui/Badge";
import type { TechnicalApproval } from "../../types/TechnicalApproval";
import { parseLocalDateTime } from "~/lib/date-utils";

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
          {approval.date 
            ? (() => {
                const date = parseLocalDateTime(approval.date);
                return date ? date.toLocaleDateString() : "N/A";
              })()
            : "N/A"} • {approval.city}
        </p>
      </div>
      <Badge>
        {approval.status === "PENDING" && "Pending"}
        {approval.status === "APPROVED" && "Approved"}
        {approval.status === "REVISION_REQUESTED" && "Revision Requested"}
      </Badge>
    </div>
  );
}

