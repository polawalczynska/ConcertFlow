import { Card, CardContent } from "~/components/ui/Card";
import { PendingInvitationsHeader } from "./pending-invitations/PendingInvitationsHeader";
import { PendingInvitationItem } from "./pending-invitations/PendingInvitationItem";
import { PendingInvitationsFooter } from "./pending-invitations/PendingInvitationsFooter";
import type { TeamInvitationResponse } from "~/api";

interface PendingInvitationsProps {
  invitations: TeamInvitationResponse[];
}

export function PendingInvitations({ invitations }: PendingInvitationsProps) {
  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <PendingInvitationsHeader />
      <CardContent>
        <div className="space-y-3">
          {invitations.map((invitation) => (
            <PendingInvitationItem key={invitation.id} invitation={invitation} />
          ))}
        </div>
        <PendingInvitationsFooter />
      </CardContent>
    </Card>
  );
}

