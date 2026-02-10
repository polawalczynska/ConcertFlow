import { Mail, Phone, Calendar } from "lucide-react";
import type { TeamMemberResponse } from "~/api";

interface TeamMemberContactInfoProps {
  member: TeamMemberResponse;
}

export function TeamMemberContactInfo({ member }: TeamMemberContactInfoProps) {
  const assignedConcerts = member.assignedConcerts || 0;
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="flex items-center gap-3 rounded-lg bg-bg-secondary p-4 md:col-span-2">
        <Mail className="h-5 w-5 text-pink-600 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-text-secondary">Email</p>
          <p className="font-semibold text-text-primary truncate" title={member.email || "N/A"}>
            {member.email || "N/A"}
          </p>
        </div>
      </div>
      {member.phone && (
        <div className="flex items-center gap-3 rounded-lg bg-bg-secondary p-4">
          <Phone className="h-5 w-5 text-pink-600" />
          <div>
            <p className="text-xs text-text-secondary">Phone</p>
            <p className="font-semibold text-text-primary">{member.phone}</p>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 rounded-lg bg-bg-secondary p-4">
        <Calendar className="h-5 w-5 text-pink-600" />
        <div>
          <p className="text-xs text-text-secondary">Total Concerts</p>
          <p className="font-semibold text-text-primary">{assignedConcerts}</p>
        </div>
      </div>
    </div>
  );
}

