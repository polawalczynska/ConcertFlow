import { Badge } from "~/components/ui/Badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "PENDING":
      return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
    case "APPROVED":
      return <Badge className="bg-green-600 text-white">Approved</Badge>;
    case "REJECTED":
      return <Badge className="bg-red-600 text-white">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

