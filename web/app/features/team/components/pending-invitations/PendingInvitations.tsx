import { Card, CardContent } from "~/components/ui/Card";
import { PendingInvitationsHeader } from "./PendingInvitationsHeader";
import { PendingInvitationItem } from "./PendingInvitationItem";
import { PendingInvitationsFooter } from "./PendingInvitationsFooter";
import type { TeamInvitationResponse } from "~/api";

interface PendingInvitationsProps {
  invitations: TeamInvitationResponse[];
  onCancelInvitation?: (invitation: TeamInvitationResponse) => void;
  isCancelling?: boolean;
}

export function PendingInvitations({
                                     invitations,
                                     onCancelInvitation,
                                     isCancelling = false
                                   }: PendingInvitationsProps) {
  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <PendingInvitationsHeader/>
      <CardContent>
        <div className="space-y-3">
          {invitations.map((invitation) => (
            <PendingInvitationItem
              key={invitation.id}
              invitation={invitation}
              onCancel={onCancelInvitation}
              isCancelling={isCancelling}
            />
          ))}
        </div>
        <PendingInvitationsFooter/>
      </CardContent>
    </Card>
  );
}

