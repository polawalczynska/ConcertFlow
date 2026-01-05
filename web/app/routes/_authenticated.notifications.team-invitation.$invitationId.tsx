import { useParams } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/Card";
import { TeamInvitationHeader } from "~/features/notifications/components/TeamInvitationHeader";
import { TeamInvitationCardHeader } from "~/features/notifications/components/TeamInvitationCardHeader";
import { TeamInvitationInfo } from "~/features/notifications/components/TeamInvitationInfo";
import { TeamInvitationActions } from "~/features/notifications/components/TeamInvitationActions";
import { TeamInvitationStatus } from "~/features/notifications/components/TeamInvitationStatus";
import { TeamInvitationNotFound } from "~/features/notifications/components/TeamInvitationNotFound";
import { useTeamInvitation } from "~/features/notifications/hooks/useTeamInvitation";

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

