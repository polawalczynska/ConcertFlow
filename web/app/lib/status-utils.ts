export function getStatusBadgeClasses(status?: string): string {
  const baseClasses = "px-2 py-1 text-xs whitespace-nowrap border";
  
  switch (status) {
    case "APPROVED":
      return `${baseClasses} bg-green-100 text-green-800 border-green-200`;
    case "SUBMITTED":
      return `${baseClasses} bg-blue-100 text-blue-800 border-blue-200`;
    case "REVISION_REQUESTED":
      return `${baseClasses} bg-orange-100 text-orange-800 border-orange-200`;
    case "PENDING":
      return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200`;
    
    case "PLANNING":
      return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200`;
    case "APPROVED":
      return `${baseClasses} bg-green-100 text-green-800 border-green-200`;
    case "COMPLETED":
      return `${baseClasses} bg-blue-100 text-blue-800 border-blue-200`;
    case "CANCELLED":
      return `${baseClasses} bg-red-100 text-red-800 border-red-200`;
    
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
  }
}

export function formatStatusLabel(status?: string): string {
  if (!status) return "N/A";
  
  switch (status) {
    case "APPROVED":
      return "Approved";
    case "SUBMITTED":
      return "Submitted";
    case "REVISION_REQUESTED":
      return "Revision Requested";
    case "PENDING":
      return "Pending";
    case "UNDER_REVIEW":
      return "Under Review";
    
    case "PLANNING":
      return "Planning";
    case "APPROVED":
      return "Approved";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    
    default:
      return status
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
  }
}

