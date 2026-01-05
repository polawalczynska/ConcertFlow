export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  BUDGET_DASHBOARD: "/budget-dashboard",
  TECHNICAL_DASHBOARD: "/technical-dashboard",
  CONCERTS: "/concerts",
  ARTISTS: "/artists",
  TEAM: "/team",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
} as const;

export function getRedirectPathForRole(role?: string): string {
  if (role === "BUDGET_MANAGER") {
    return ROUTES.BUDGET_DASHBOARD;
  }
  if (role === "TECHNICAL_MANAGER") {
    return ROUTES.TECHNICAL_DASHBOARD;
  }
  return ROUTES.DASHBOARD;
}

