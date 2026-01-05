import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "~/lib/api-client";
import type { NotificationResponse } from "~/api";

export function useNotifications() {
  return useQuery<NotificationResponse[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await notificationApi.getNotifications();
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useUnreadNotificationCount() {
  return useQuery<number>({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const response = await notificationApi.getUnreadCount();
      return response.data;
    },
    staleTime: 10 * 1000,
    refetchInterval: 30 * 1000,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      await notificationApi.markAsRead(notificationId);
    },
    onMutate: async (notificationId: number) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previousNotifications = queryClient.getQueryData<NotificationResponse[]>(["notifications"]);

      if (previousNotifications) {
        queryClient.setQueryData<NotificationResponse[]>(
          ["notifications"],
          previousNotifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          )
        );
      }

      const previousUnreadCount = queryClient.getQueryData<number>([
        "notifications",
        "unread-count",
      ]);
      if (previousUnreadCount !== undefined) {
        queryClient.setQueryData<number>(
          ["notifications", "unread-count"],
          Math.max(0, previousUnreadCount - 1)
        );
      }

      return { previousNotifications, previousUnreadCount };
    },
    onError: (err, notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(["notifications"], context.previousNotifications);
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          ["notifications", "unread-count"],
          context.previousUnreadCount
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
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
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
}

