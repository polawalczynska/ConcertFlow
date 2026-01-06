export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  assignedConcerts: number;
  availability?: "available" | "busy" | "unavailable";
  skills?: string[];
}

export interface TeamInvitation {
  id: number;
  email: string;
  role: string;
  status: "pending" | "accepted" | "rejected";
  invitedAt: string;
}

