import { TeamMemberCard } from "./card/TeamMemberCard";
import { PendingInvitations } from "./PendingInvitations";
import { useUser } from "~/hooks/useUser";
import type { TeamMember, TeamInvitation } from "../types";

interface TeamListProps {
  members: TeamMember[];
  pendingInvitations: TeamInvitation[];
  searchQuery: string;
  onDeleteMember: (member: TeamMember) => void;
}

export function TeamList({ members, pendingInvitations, onDeleteMember }: TeamListProps) {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";
  const pendingInvites = pendingInvitations.filter((inv) => inv.status === "pending");

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

