import { CardHeader, CardTitle } from "~/components/ui/Card";
import { Clock } from "lucide-react";

export function PendingInvitationsHeader() {
  return (
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Pending Invitations
      </CardTitle>
    </CardHeader>
  );
}

