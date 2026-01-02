import { TeamMemberCard } from "./card/TeamMemberCard";
import { PendingInvitations } from "./PendingInvitations";
import { useUser } from "~/hooks/useUser";
import type { TeamMemberResponse, TeamInvitationResponse } from "~/api";

interface TeamListProps {
  members: TeamMemberResponse[];
  pendingInvitations: TeamInvitationResponse[];
  searchQuery: string;
  onDeleteMember: (member: TeamMemberResponse) => void;
  isLoading?: boolean;
}

export function TeamList({ members, pendingInvitations, onDeleteMember, isLoading }: TeamListProps) {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";
  const pendingInvites = pendingInvitations.filter((inv) => inv.status === "PENDING");

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-bg-card border border-border-light" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isCoordinator && pendingInvites.length > 0 && (
        <PendingInvitations invitations={pendingInvites} />
      )}
      
      {members.length === 0 ? (
        <div className="rounded-xl border border-border-light bg-bg-card p-12 text-center">
          <p className="text-text-secondary">No team members found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} onDelete={onDeleteMember} />
          ))}
        </div>
      )}
    </div>
  );
}

