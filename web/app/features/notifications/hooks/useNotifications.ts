import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "~/lib/api-client";
import { mapNotificationResponseToNotification } from "../utils/notificationMapper";
import type { Notification } from "../types";

export function useNotificationsQuery() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await notificationApi.getNotifications();
      return response.data;
    },
  });
}

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const response = await notificationApi.getUnreadCount();
      return response.data;
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await notificationApi.markAllAsRead();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await notificationApi.markAsRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

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
