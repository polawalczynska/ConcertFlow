import type { LucideIcon } from "lucide-react";
import type { NotificationResponseTypeEnum } from "~/api";

export interface Notification {
  id: number;
  type: "concert" | "team" | "budget" | "technical" | "calendar";
  notificationType?: NotificationResponseTypeEnum;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
  color: string;
  concertId?: number;
  invitationId?: number;
  notificationId?: number;
}

