import type { TeamMemberResponse } from "~/api";
import { formatRole } from "~/lib/role-utils";

interface TeamMemberCardHeaderProps {
  member: TeamMemberResponse;
}

export function TeamMemberCardHeader({ member }: TeamMemberCardHeaderProps) {
  const initial = member.name?.charAt(0) || "?";
  return (
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-semibold text-purple-600">
          {initial}
        </div>
        <div>
          <h3 className="font-semibold text-text-primary">{member.name || "Unknown"}</h3>
          <p className="text-sm text-text-secondary">{formatRole(member.role)}</p>
        </div>
      </div>
    </div>
  );
}

