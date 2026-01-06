export interface TeamInvitation {
  id: number;
  email: string;
  role: string;
  status: "pending" | "accepted" | "rejected";
  invitedAt: string;
  invitedBy?: string;
}

