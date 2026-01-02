import type { TeamInvitationResponse } from "~/api";

interface TeamInvitationInfoProps {
  invitation: TeamInvitationResponse;
}

export function TeamInvitationInfo({ invitation }: TeamInvitationInfoProps) {
  const invitedDate = invitation.invitedAt ? new Date(invitation.invitedAt).toLocaleDateString() : "Unknown";
  return (
    <div className="rounded-lg border border-border-light bg-bg-secondary p-4">
      <div className="space-y-3">
        {invitation.invitedBy && (
          <div>
            <p className="text-xs text-text-secondary">Invited by</p>
            <p className="font-semibold text-text-primary">{invitation.invitedBy}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-text-secondary">Invited on</p>
          <p className="font-semibold text-text-primary">
            {invitedDate}
          </p>
        </div>
      </div>
    </div>
  );
}

