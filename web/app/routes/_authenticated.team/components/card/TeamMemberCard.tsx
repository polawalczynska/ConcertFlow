import { Link } from "@remix-run/react";
import { TeamMemberCardHeader } from "./TeamMemberCardHeader";
import { TeamMemberCardInfo } from "./TeamMemberCardInfo";
import { TeamMemberCardDeleteButton } from "./TeamMemberCardDeleteButton";
import type { TeamMember } from "./types";

interface TeamMemberCardProps {
  member: TeamMember;
  onDelete: (member: TeamMember) => void;
}

export function TeamMemberCard({ member, onDelete }: TeamMemberCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-light bg-bg-card transition-all hover:shadow-card-hover">
      <Link to={`/team/${member.id}`} className="block">
        <div className="p-6">
          <TeamMemberCardHeader member={member} />
          <TeamMemberCardInfo member={member} />
        </div>
      </Link>
      <TeamMemberCardDeleteButton member={member} onDelete={onDelete} />
    </div>
  );
}
