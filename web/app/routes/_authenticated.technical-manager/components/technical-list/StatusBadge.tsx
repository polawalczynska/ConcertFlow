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
    case "REVISION_REQUESTED":
      return <Badge className="bg-orange-500 text-white">Revision Requested</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

