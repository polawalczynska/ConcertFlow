/**
 * Formats a role string from snake_case to user-friendly format
 * @param role - Role in snake_case format (e.g., "BUDGET_MANAGER")
 * @returns Formatted role string (e.g., "Budget Manager")
 */
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
      // Fallback: convert snake_case to Title Case
      return role
        .split("_")
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
  }
}

