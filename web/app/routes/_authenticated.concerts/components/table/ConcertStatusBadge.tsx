import { Badge } from "~/components/ui/Badge";
import { getStatusColor, formatStatus } from "./concertsTableUtils";

interface ConcertStatusBadgeProps {
  status?: string;
  className?: string;
}

export function ConcertStatusBadge({ status, className }: ConcertStatusBadgeProps) {
  return (
    <Badge className={`${getStatusColor(status)} px-2 py-1 text-xs whitespace-nowrap ${className || ""}`}>
      {formatStatus(status)}
    </Badge>
  );
}

