import { Card, CardContent } from "~/components/ui/Card";

interface NotificationsEmptyStateProps {
  tabValue: string;
}

export function NotificationsEmptyState({
  tabValue,
}: NotificationsEmptyStateProps) {
  const getEmptyMessage = () => {
    switch (tabValue) {
      case "unread":
        return "No unread notifications.";
      case "concerts":
        return "No concert notifications.";
      case "team":
        return "No team notifications.";
      default:
        return "No notifications found.";
    }
  };

  return (
    <Card>
      <CardContent className="p-8 text-center">
        <p className="text-text-secondary">{getEmptyMessage()}</p>
      </CardContent>
    </Card>
  );
}

