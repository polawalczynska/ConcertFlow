import type { TeamInvitation } from "../types";

export const mockInvitation: TeamInvitation = {
  id: 1,
  email: "user@example.com",
  role: "Budget Manager",
  status: "pending",
  invitedAt: new Date().toISOString(),
  invitedBy: "John Doe",
};

