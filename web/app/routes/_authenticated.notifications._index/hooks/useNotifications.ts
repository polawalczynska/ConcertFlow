import { useMemo } from "react";
import { useNotifications as useNotificationsQuery, useUnreadNotificationCount, useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from "~/features/notifications/hooks";
import { mapNotificationResponseToNotification } from "../utils/notificationMapper";
import type { Notification } from "../types";

export function useNotifications() {
  const { data: notificationsResponse = [], isLoading } = useNotificationsQuery();
  const { data: unreadCount = 0 } = useUnreadNotificationCount();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  const markAsReadMutation = useMarkNotificationAsRead();

  const notifications = useMemo(
    () => notificationsResponse.map(mapNotificationResponseToNotification),
    [notificationsResponse]
  );

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id);
  };

  const getFilteredNotifications = (activeTab: string): Notification[] => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "concerts":
        return notifications.filter(
          (n) => n.type === "concert" || n.type === "budget" || n.type === "technical"
        );
      case "team":
        return notifications.filter((n) => n.type === "team");
      default:
        return notifications;
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    handleMarkAllAsRead,
    handleMarkAsRead,
    getFilteredNotifications,
  };
}

