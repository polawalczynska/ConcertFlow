import { formatRole } from "./navbarData";
import type { UserResponse } from "~/api";

interface DesktopUserInfoProps {
  user: UserResponse | undefined;
  isLoading: boolean;
}

export function DesktopUserInfo({ user, isLoading }: DesktopUserInfoProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-end">
        <div className="h-4 w-24 animate-pulse rounded bg-border-light"></div>
        <div className="mt-1 h-3 w-16 animate-pulse rounded bg-border-light"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-end">
      <span className="text-sm font-medium text-text-primary">
        {user.firstName} {user.lastName}
      </span>
      <span className="text-xs text-text-secondary">
        {formatRole(user.role)}
      </span>
    </div>
  );
}

