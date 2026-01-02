import { Button } from "~/components/ui/Button";
import { CheckCheck } from "lucide-react";

interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export function NotificationsHeader({
  unreadCount,
  onMarkAllAsRead,
}: NotificationsHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Notifications</h1>
        <p className="mt-1 text-sm text-text-secondary">
          You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
        </p>
      </div>
      {unreadCount > 0 && (
        <Button variant="outline" onClick={onMarkAllAsRead}>
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      )}
    </div>
  );
}

