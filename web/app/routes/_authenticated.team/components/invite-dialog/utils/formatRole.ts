export function formatRole(role?: string): string {
  switch (role) {
    case "COORDINATOR":
      return "Coordinator";
    case "BUDGET_MANAGER":
      return "Budget Manager";
    case "TECHNICAL_MANAGER":
      return "Technical Manager";
    default:
      return role || "Unknown";
  }
}

