import type { TeamMember } from "./types";

interface TeamMemberCardHeaderProps {
  member: TeamMember;
}

export function TeamMemberCardHeader({ member }: TeamMemberCardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-semibold text-purple-600">
          {member.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-text-primary">{member.name}</h3>
          <p className="text-sm text-text-secondary">{member.role}</p>
        </div>
      </div>
    </div>
  );
}

