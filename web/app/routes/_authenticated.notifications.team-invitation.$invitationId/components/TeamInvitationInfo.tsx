import type { TeamInvitation } from "../types";

interface TeamInvitationInfoProps {
  invitation: TeamInvitation;
}

export function TeamInvitationInfo({ invitation }: TeamInvitationInfoProps) {
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
            {new Date(invitation.invitedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

