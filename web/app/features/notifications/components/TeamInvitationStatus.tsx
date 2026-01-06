import type { TeamInvitationResponse } from "~/api";

interface TeamInvitationStatusProps {
  invitation: TeamInvitationResponse;
}

export function TeamInvitationStatus({ invitation }: TeamInvitationStatusProps) {
  return (
    <div className="rounded-lg border border-border-light bg-bg-secondary p-4">
      <p className="text-sm text-text-secondary">
        {invitation.status === "ACCEPTED"
          ? "You have accepted this invitation and are now a member of the team."
          : "You have rejected this invitation."}
      </p>
    </div>
  );
}

