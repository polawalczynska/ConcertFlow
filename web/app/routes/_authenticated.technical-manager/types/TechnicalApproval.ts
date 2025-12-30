export interface TechnicalApproval {
  id: number;
  concertId: number;
  concertName: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  capacity: number;
  technicalFlags: string[];
  powerRequirements: number;
  status: "PENDING" | "APPROVED" | "REVISION_REQUESTED";
  urgency: "CRITICAL" | "HIGH" | "NORMAL";
  daysUntil: number;
  technicalRequirements: string;
  submittedAt?: string | null;
}

