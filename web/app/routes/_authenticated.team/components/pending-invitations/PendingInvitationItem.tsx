import { Badge } from "~/components/ui/Badge";
import type { TeamInvitation } from "../../types";

interface PendingInvitationItemProps {
  invitation: TeamInvitation;
}

export function PendingInvitationItem({ invitation }: PendingInvitationItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-text-primary">{invitation.email}</p>
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            {invitation.role}
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Awaiting response
          </Badge>
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          Invited {new Date(invitation.invitedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

