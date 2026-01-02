import { useNavigate } from "@remix-run/react";
import { TeamMemberCardHeader } from "./TeamMemberCardHeader";
import { TeamMemberCardInfo } from "./TeamMemberCardInfo";
import { TeamMemberCardDeleteButton } from "./TeamMemberCardDeleteButton";
import type { TeamMember } from "./types";

interface TeamMemberCardProps {
  member: TeamMember;
  onDelete: (member: TeamMember) => void;
}

export function TeamMemberCard({ member, onDelete }: TeamMemberCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/team/${member.id}`);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border-light bg-bg-card transition-all hover:shadow-card-hover">
      <div onClick={handleCardClick} className="block relative z-0 cursor-pointer">
        <div className="p-6">
          <TeamMemberCardHeader member={member} />
          <TeamMemberCardInfo member={member} />
        </div>
      </div>
      <div className="absolute right-4 top-4 z-10">
        <TeamMemberCardDeleteButton member={member} onDelete={onDelete} />
      </div>
    </div>
  );
}
