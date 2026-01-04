import { X } from "lucide-react";
import { formatRole } from "./navbarData";
import type { UserResponse } from "~/api";

interface MobileMenuHeaderProps {
  user: UserResponse | undefined;
  isLoading: boolean;
  onClose: () => void;
}

export function MobileMenuHeader({ user, isLoading, onClose }: MobileMenuHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-border-light px-4">
      <div className="flex flex-col items-start">
        {isLoading ? (
          <>
            <div className="h-4 w-32 animate-pulse rounded bg-border-light"></div>
            <div className="mt-1 h-3 w-24 animate-pulse rounded bg-border-light"></div>
          </>
        ) : user ? (
          <>
            <span className="text-sm font-medium text-text-primary">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-xs text-text-secondary">
              {formatRole(user.role)}
            </span>
          </>
        ) : null}
      </div>
      <button
        onClick={onClose}
        className="flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
        aria-label="Close menu"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}

