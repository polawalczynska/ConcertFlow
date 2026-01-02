import { useNavigate } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/Card";
import type { Notification } from "../types";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const navigate = useNavigate();
  const Icon = notification.icon;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMarkAsRead(notification.id);
    if (notification.type === "team" && notification.invitationId) {
      navigate(`/notifications/team-invitation/${notification.invitationId}`, {
        replace: false,
      });
    } else if (notification.concertId) {
      navigate(`/concerts/${notification.concertId}`, { replace: false });
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        notification.read
          ? "bg-bg-card border-border-light"
          : "bg-purple-50 border-purple-200"
      }`}
      onClick={handleClick}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-bg-main ${notification.color}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-text-primary">{notification.title}</h3>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-purple-main flex-shrink-0 mt-1.5" />
            )}
          </div>
          <p className="text-sm text-text-secondary">{notification.description}</p>
          <p className="text-xs text-text-secondary">{notification.time}</p>
        </div>
      </CardContent>
    </Card>
  );
}

