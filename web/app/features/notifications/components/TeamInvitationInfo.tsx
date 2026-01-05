import type { TeamInvitationResponse } from "~/api";
import { formatDateOnly } from "~/shared/utils";

interface TeamInvitationInfoProps {
  invitation: TeamInvitationResponse;
}

export function TeamInvitationInfo({ invitation }: TeamInvitationInfoProps) {
  const invitedDate = invitation.invitedAt ? formatDateOnly(invitation.invitedAt) : "Unknown";
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

