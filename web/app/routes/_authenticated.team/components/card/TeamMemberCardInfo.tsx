import { Mail, Phone, Calendar } from "lucide-react";
import type { TeamMember } from "./types";

interface TeamMemberCardInfoProps {
  member: TeamMember;
}

export function TeamMemberCardInfo({ member }: TeamMemberCardInfoProps) {
  return (
    <div className="space-y-2 text-sm text-text-secondary">
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-purple-600 flex-shrink-0" />
        <span className="truncate">{member.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-purple-600 flex-shrink-0" />
        <span>{member.phone}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-purple-600 flex-shrink-0" />
        <span>
          {member.assignedConcerts} {member.assignedConcerts === 1 ? "concert" : "concerts"} assigned
        </span>
      </div>
    </div>
  );
}

