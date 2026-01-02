import type { LucideIcon } from "lucide-react";

export interface Notification {
  id: number;
  type: "concert" | "team" | "budget" | "technical" | "calendar";
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

