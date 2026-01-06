import { Badge } from "~/components/ui/Badge";
import { getConcertStatusBadgeClasses } from "./utils/getConcertStatusBadgeClasses";

interface AssignedConcertStatusBadgeProps {
  status: "upcoming" | "completed";
}

export function AssignedConcertStatusBadge({ status }: AssignedConcertStatusBadgeProps) {
  return <Badge className={getConcertStatusBadgeClasses(status)}>{status}</Badge>;
}

