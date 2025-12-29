export interface TechnicalApproval {
  id: number;
  concertId: number;
  concertName: string;
  artist: string;
  artistId: number;
  genre: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  capacity: number;
  complianceScore: number;
  technicalFlags: string[];
  powerRequirements: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  urgency: "CRITICAL" | "HIGH" | "NORMAL";
  daysUntil: number;
  technicalRequirements: string;
}

export const mockApprovals: TechnicalApproval[] = [
  {
    id: 1,
    concertId: 1,
    concertName: "Winter Electro Festival",
    artist: "DJ Phoenix",
    artistId: 1,
    genre: "Electronic",
    date: "2024-12-28",
    time: "20:00",
    venue: "Arena East",
    city: "Warsaw",
    capacity: 5000,
    complianceScore: 75,
    technicalFlags: ["high_power", "complex_audio"],
    powerRequirements: 95,
    status: "PENDING" as const,
    urgency: "HIGH" as const,
    daysUntil: 2,
    technicalRequirements: "Requires 95kW power, 48-channel audio console, LED wall 12x8m, complex lighting setup with 120 fixtures across 8 DMX universes. Pyrotechnics not required.",
  },
  {
    id: 2,
    concertId: 2,
    concertName: "Jazz Under Stars",
    artist: "Blue Notes Quartet",
    artistId: 2,
    genre: "Jazz",
    date: "2025-01-05",
    time: "19:30",
    venue: "Garden Theater",
    city: "Krakow",
    capacity: 800,
    complianceScore: 95,
    technicalFlags: [],
    powerRequirements: 25,
    status: "PENDING" as const,
    urgency: "NORMAL" as const,
    daysUntil: 10,
    technicalRequirements: "Simple setup: 25kW power, 16-channel audio console, basic lighting with 24 fixtures. No special effects required.",
  },
  {
    id: 3,
    concertId: 3,
    concertName: "Rock Revolution",
    artist: "Thunderstrike",
    artistId: 3,
    genre: "Rock",
    date: "2024-12-30",
    time: "21:00",
    venue: "Stadium Central",
    city: "Gdansk",
    capacity: 15000,
    complianceScore: 60,
    technicalFlags: ["pyro", "high_power", "complex_audio"],
    powerRequirements: 150,
    status: "PENDING" as const,
    urgency: "CRITICAL" as const,
    daysUntil: 4,
    technicalRequirements: "Critical requirements: 150kW power, 64-channel audio console, LED wall 16x10m, 180 lighting fixtures, pyrotechnics with safety perimeter. Requires fire marshal on-site.",
  },
];

