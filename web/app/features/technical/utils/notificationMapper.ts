import { Users, DollarSign, Wrench, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NotificationResponse } from "~/api";
import type { Notification } from "~/features/notifications/types";


function getIconComponent(iconName?: string): LucideIcon {
  switch (iconName) {
    case "Users":
      return Users;
    case "DollarSign":
      return DollarSign;
    case "Wrench":
      return Wrench;
    case "Calendar":
      return Calendar;
    case "CheckCircle2":
      return CheckCircle2;
    case "AlertCircle":
      return AlertCircle;
    default:
      return AlertCircle;
  }
}


export function mapNotificationResponseToNotification(response: NotificationResponse): Notification {
  return {
    id: response.id ?? 0,
    type: (response.category as "concert" | "team" | "budget" | "technical" | "calendar") ?? "concert",
    notificationType: response.type,
    title: response.title ?? "",
    description: response.description ?? "",
    time: response.relativeTime ?? "Recently",
    read: response.read ?? false,
    icon: getIconComponent(response.icon),
    color: response.color ?? "text-gray-600",
    concertId: response.concertId ?? undefined,
    invitationId: response.invitationId ?? undefined,
    notificationId: response.id ?? undefined,
  };
}

