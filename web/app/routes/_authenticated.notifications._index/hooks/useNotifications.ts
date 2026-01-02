import { useState, useMemo } from "react";
import type { Notification } from "../types";

export function useNotifications(initialNotifications: Notification[]) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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
    setNotifications,
    unreadCount,
    handleMarkAllAsRead,
    handleMarkAsRead,
    getFilteredNotifications,
  };
}

