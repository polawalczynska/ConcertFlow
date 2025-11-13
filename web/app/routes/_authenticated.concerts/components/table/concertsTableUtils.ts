export function getStatusColor(status?: string): string {
  switch (status) {
    case "PLANNING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "APPROVED":
      return "bg-green-100 text-green-800 border-green-200";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-bg-secondary text-text-secondary border-border-light";
  }
}

export function formatStatus(status?: string): string {
  if (!status) return "N/A";
  switch (status) {
    case "PLANNING":
      return "Planning";
    case "APPROVED":
      return "Approved";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
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

