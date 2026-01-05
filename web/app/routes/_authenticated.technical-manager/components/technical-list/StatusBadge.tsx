import { Badge } from "~/components/ui/Badge";
import { getStatusBadgeClasses, formatStatusLabel } from "~/shared/utils";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={getStatusBadgeClasses(status)}>
      {formatStatusLabel(status)}
    </Badge>
  );
}

