import { Info, Mail } from "lucide-react";
import { Badge } from "~/components/ui/Badge";
import type { UserResponse } from "~/api";
import { formatRole } from "./utils/formatRole";

interface UserAlreadyOnTeamProps {
  user: UserResponse;
}

export function UserAlreadyOnTeam({ user }: UserAlreadyOnTeamProps) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-medium text-text-primary">
              {user.firstName} {user.lastName}
            </p>
            <Badge className="bg-pink-100 text-pink-800 border-pink-200">
              {formatRole(user.role)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <p className="mt-2 text-xs text-blue-800">
            This user is already a member of your team.
          </p>
        </div>
      </div>
    </div>
  );
}

