import { Mail, Phone, Calendar } from "lucide-react";
import type { TeamMemberResponse } from "~/api";

interface TeamMemberCardInfoProps {
  member: TeamMemberResponse;
}

export function TeamMemberCardInfo({ member }: TeamMemberCardInfoProps) {
  const assignedConcerts = member.assignedConcerts || 0;
  return (
    <div className="space-y-2 text-sm text-text-secondary">
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <span className="truncate">{member.email || "N/A"}</span>
      </div>
      {member.phone && (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span>{member.phone}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <span>
          {assignedConcerts} {assignedConcerts === 1 ? "concert" : "concerts"} assigned
        </span>
      </div>
    </div>
  );
}

