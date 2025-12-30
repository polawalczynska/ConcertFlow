export interface TechnicalArea {
  id: string;
  name: string;
  description: string;
}

export const technicalAreas: TechnicalArea[] = [
  { id: "audio", name: "Audio", description: "PA system, mixing console, channels" },
  { id: "lighting", name: "Lighting", description: "Fixtures, DMX, power requirements" },
  { id: "safety", name: "Safety", description: "Permits, certifications, compliance" },
  { id: "equipment", name: "Equipment", description: "Backline, special effects, pyrotechnics" },
];

