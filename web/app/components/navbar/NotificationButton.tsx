import { Link, useLocation } from "@remix-run/react";
import { Bell } from "lucide-react";
import { cn } from "~/lib/utils";

interface NotificationButtonProps {
  unreadCount: number;
}

export function NotificationButton({ unreadCount }: NotificationButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === "/notifications/" || location.pathname.startsWith("/notifications/");

  return (
    <Link
      to="/notifications/"
      className={cn(
        "relative flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary",
        isActive && "bg-bg-secondary text-text-primary"
      )}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}

