import { Users, DollarSign, Wrench, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NotificationResponse, NotificationResponseTypeEnum } from "~/api";
import type { Notification } from "../types";


function mapNotificationTypeToCategory(type: NotificationResponseTypeEnum): "concert" | "team" | "budget" | "technical" | "calendar" {
  switch (type) {
    case "TEAM_INVITATION":
      return "team";
    case "BUDGET_REVISION_REQUESTED":
    case "BUDGET_APPROVED":
    case "BUDGET_SUBMITTED":
      return "budget";
    case "TECHNICAL_REVISION_REQUESTED":
    case "TECHNICAL_APPROVED":
    case "TECHNICAL_SUBMITTED":
      return "technical";
    case "UPCOMING_CONCERT_REMINDER":
      return "calendar";
    case "CONCERT_STATUS_CHANGED":
    default:
      return "concert";
  }
}

function getNotificationIcon(type: NotificationResponseTypeEnum): LucideIcon {
  switch (type) {
    case "TEAM_INVITATION":
      return Users;
    case "BUDGET_REVISION_REQUESTED":
    case "BUDGET_SUBMITTED":
      return DollarSign;
    case "BUDGET_APPROVED":
      return CheckCircle2;
    case "TECHNICAL_REVISION_REQUESTED":
    case "TECHNICAL_SUBMITTED":
      return Wrench;
    case "TECHNICAL_APPROVED":
      return CheckCircle2;
    case "UPCOMING_CONCERT_REMINDER":
      return Calendar;
    case "CONCERT_STATUS_CHANGED":
      return AlertCircle;
    default:
      return AlertCircle;
  }
}

function getNotificationColor(type: NotificationResponseTypeEnum): string {
  switch (type) {
    case "TEAM_INVITATION":
      return "text-blue-600";
    case "BUDGET_REVISION_REQUESTED":
    case "TECHNICAL_REVISION_REQUESTED":
      return "text-orange-600";
    case "BUDGET_APPROVED":
    case "TECHNICAL_APPROVED":
    case "CONCERT_STATUS_CHANGED":
      return "text-green-600";
    case "BUDGET_SUBMITTED":
    case "TECHNICAL_SUBMITTED":
      return "text-blue-600";
    case "UPCOMING_CONCERT_REMINDER":
      return "text-indigo-600";
    default:
      return "text-gray-600";
  }
}

function formatTime(createdAt: string): string {
  try {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    
    // For older dates, show the date
    return date.toLocaleDateString();
  } catch {
    return "Recently";
  }
}

export function mapNotificationResponseToNotification(response: NotificationResponse): Notification {
  return {
    id: response.id ?? 0,
    type: mapNotificationTypeToCategory(response.type),
    title: response.title ?? "",
    description: response.description ?? "",
    time: response.createdAt ? formatTime(response.createdAt) : "Recently",
    read: response.read ?? false,
    icon: getNotificationIcon(response.type),
    color: getNotificationColor(response.type),
    concertId: response.concertId ?? undefined,
    invitationId: response.invitationId ?? undefined,
    notificationId: response.id ?? undefined,
  };
}

