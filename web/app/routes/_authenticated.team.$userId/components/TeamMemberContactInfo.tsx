import { Mail, Phone, Calendar } from "lucide-react";
import type { TeamMember } from "~/routes/_authenticated.team/types";

interface TeamMemberContactInfoProps {
  member: TeamMember;
}

export function TeamMemberContactInfo({ member }: TeamMemberContactInfoProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="flex items-center gap-3 rounded-lg bg-bg-secondary p-4">
        <Mail className="h-5 w-5 text-purple-600" />
        <div>
          <p className="text-xs text-text-secondary">Email</p>
          <p className="font-semibold text-text-primary">{member.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-bg-secondary p-4">
        <Phone className="h-5 w-5 text-purple-600" />
        <div>
          <p className="text-xs text-text-secondary">Phone</p>
          <p className="font-semibold text-text-primary">{member.phone}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-bg-secondary p-4">
        <Calendar className="h-5 w-5 text-purple-600" />
        <div>
          <p className="text-xs text-text-secondary">Total Concerts</p>
          <p className="font-semibold text-text-primary">{member.assignedConcerts}</p>
        </div>
      </div>
    </div>
  );
}

