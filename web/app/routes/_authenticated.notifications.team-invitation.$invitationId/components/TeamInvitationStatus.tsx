import type { TeamInvitation } from "../types";

interface TeamInvitationStatusProps {
  invitation: TeamInvitation;
}

export function TeamInvitationStatus({ invitation }: TeamInvitationStatusProps) {
  return (
    <div className="rounded-lg border border-border-light bg-bg-secondary p-4">
      <p className="text-sm text-text-secondary">
        {invitation.status === "accepted"
          ? "You have accepted this invitation and are now a member of the team."
          : "You have rejected this invitation."}
      </p>
    </div>
  );
}

