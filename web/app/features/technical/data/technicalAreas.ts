export interface TechnicalArea {
  id: string;
  name: string;
  description?: string;
}

export const technicalAreas: TechnicalArea[] = [
  { id: "audio", name: "Audio", description: "Audio requirements and specifications" },
  { id: "lighting", name: "Lighting", description: "Lighting requirements and fixtures" },
  { id: "safety", name: "Safety", description: "Safety requirements and permits" },
  { id: "power", name: "Power", description: "Power requirements and electrical needs" },
];

