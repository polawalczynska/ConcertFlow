import { Info, Mail } from "lucide-react";
import { Badge } from "~/components/ui/Badge";
import type { UserResponse } from "~/api";
import { formatRole } from "./utils/formatRole";

interface UserOnAnotherTeamProps {
  user: UserResponse;
}

export function UserOnAnotherTeam({ user }: UserOnAnotherTeamProps) {
  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-medium text-text-primary">
              {user.firstName} {user.lastName}
            </p>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {formatRole(user.role)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <p className="mt-2 text-xs text-orange-800">
            This user is already a member of another team.
          </p>
        </div>
      </div>
    </div>
  );
}

