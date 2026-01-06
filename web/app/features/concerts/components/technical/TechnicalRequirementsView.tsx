import type { TechnicalDetailResponse } from "~/api";
import { GeneralRequirementsView } from "./view/GeneralRequirementsView";
import { AudioRequirementsView } from "./view/AudioRequirementsView";
import { LightingRequirementsView } from "./view/LightingRequirementsView";
import { SafetyRequirementsView } from "./view/SafetyRequirementsView";

interface TechnicalRequirementsViewProps {
  technicalDetails: TechnicalDetailResponse;
}

export function TechnicalRequirementsView({ technicalDetails }: TechnicalRequirementsViewProps) {
  return (
    <div className="space-y-6">
      <GeneralRequirementsView technicalDetails={technicalDetails} />
      
      {technicalDetails.audio && (
        <AudioRequirementsView audio={technicalDetails.audio} />
      )}

      {technicalDetails.lighting && (
        <LightingRequirementsView lighting={technicalDetails.lighting} />
      )}

      {technicalDetails.safety && (
        <SafetyRequirementsView safety={technicalDetails.safety} />
      )}
    </div>
  );
}

