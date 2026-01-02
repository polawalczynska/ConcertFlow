import { useParams } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/Card";
import { TeamInvitationHeader } from "./_authenticated.notifications.team-invitation.$invitationId/components/TeamInvitationHeader";
import { TeamInvitationCardHeader } from "./_authenticated.notifications.team-invitation.$invitationId/components/TeamInvitationCardHeader";
import { TeamInvitationInfo } from "./_authenticated.notifications.team-invitation.$invitationId/components/TeamInvitationInfo";
import { TeamInvitationActions } from "./_authenticated.notifications.team-invitation.$invitationId/components/TeamInvitationActions";
import { TeamInvitationStatus } from "./_authenticated.notifications.team-invitation.$invitationId/components/TeamInvitationStatus";
import { TeamInvitationNotFound } from "./_authenticated.notifications.team-invitation.$invitationId/components/TeamInvitationNotFound";
import { useTeamInvitation } from "./_authenticated.notifications.team-invitation.$invitationId/hooks/useTeamInvitation";

export default function TeamInvitationPage() {
  const params = useParams();
  const invitationId = params.invitationId ? Number.parseInt(params.invitationId) : null;

  const { invitation, isLoading, isProcessing, handleAccept, handleReject } =
    useTeamInvitation(invitationId);

  if (isLoading) {
    return (
      <div className="p-8 min-h-screen bg-bg-secondary">
        <div className="mx-auto max-w-2xl">
          <div className="h-64 animate-pulse rounded-xl bg-bg-card border border-border-light" />
        </div>
      </div>
    );
  }

  if (!invitation) {
    return <TeamInvitationNotFound />;
  }

  const isPending = invitation.status === "PENDING";

  return (
    <div className="p-8 min-h-screen bg-bg-secondary">
      <div className="mx-auto max-w-2xl">
        <TeamInvitationHeader />

        <Card>
          <TeamInvitationCardHeader invitation={invitation} />
          <CardContent className="space-y-6">
            <TeamInvitationInfo invitation={invitation} />

            {isPending ? (
              <TeamInvitationActions
                onAccept={handleAccept}
                onReject={handleReject}
                isProcessing={isProcessing}
              />
            ) : (
              <TeamInvitationStatus invitation={invitation} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

