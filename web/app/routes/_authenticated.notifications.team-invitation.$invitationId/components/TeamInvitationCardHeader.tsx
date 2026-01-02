import { CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { Users } from "lucide-react";
import type { TeamInvitation } from "../types";

interface TeamInvitationCardHeaderProps {
  invitation: TeamInvitation;
}

export function TeamInvitationCardHeader({
  invitation,
}: TeamInvitationCardHeaderProps) {
  const isPending = invitation.status === "pending";

  return (
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-2xl">Team Invitation</CardTitle>
          <p className="mt-1 text-sm text-text-secondary">
            {isPending
              ? "You have been invited to join a team"
              : invitation.status === "accepted"
              ? "Invitation accepted"
              : "Invitation rejected"}
          </p>
        </div>
        {!isPending && (
          <Badge
            className={
              invitation.status === "accepted"
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            }
          >
            {invitation.status === "accepted" ? "Accepted" : "Rejected"}
          </Badge>
        )}
      </div>
    </CardHeader>
  );
}

