export function formatRole(role?: string): string {
  if (!role) return "Unknown";
  
  switch (role) {
    case "COORDINATOR":
      return "Coordinator";
    case "BUDGET_MANAGER":
      return "Budget Manager";
    case "TECHNICAL_MANAGER":
      return "Technical Manager";
    default:
      return role
        .split("_")
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
  }
}

