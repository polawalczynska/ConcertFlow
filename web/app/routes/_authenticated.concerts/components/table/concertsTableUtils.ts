import { getStatusBadgeClasses, formatStatusLabel } from "~/lib/status-utils";

export function getStatusColor(status?: string): string {
  return getStatusBadgeClasses(status);
}

export function formatStatus(status?: string): string {
  return formatStatusLabel(status);
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

