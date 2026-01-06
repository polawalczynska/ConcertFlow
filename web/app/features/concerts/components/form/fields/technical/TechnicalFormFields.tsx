import { TechnicalRequirementsField } from "./TechnicalRequirementsField";
import { PowerRequirementsField } from "./PowerRequirementsField";
import { AudioRequirementsField } from "./AudioRequirementsField";
import { LightingRequirementsField } from "./LightingRequirementsField";
import { SafetyRequirementsField } from "./SafetyRequirementsField";

export interface TechnicalFormData {
  technicalRequirements: string;
  powerRequirements: number | null;
  audioRequirements: string;
  lightingRequirements: string;
  safetyRequirements: string;
}

interface TechnicalFormFieldsProps {
  formData: TechnicalFormData;
  formErrors: Record<string, string>;
  onFieldChange: (field: keyof TechnicalFormData, value: string | number | null) => void;
  isBudgetApproved: boolean;
}

export function TechnicalFormFields({
  formData,
  formErrors,
  onFieldChange,
  isBudgetApproved,
}: TechnicalFormFieldsProps) {
  if (!isBudgetApproved) {
    return (
      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Technical requirements can only be added after the budget has been approved by the budget manager.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6 border-t pt-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Technical Requirements</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <PowerRequirementsField
            value={formData.powerRequirements}
            onChange={(value) => onFieldChange("powerRequirements", value)}
            error={formErrors.powerRequirements}
          />
          <TechnicalRequirementsField
            value={formData.technicalRequirements}
            onChange={(value) => onFieldChange("technicalRequirements", value)}
            error={formErrors.technicalRequirements}
          />
          <AudioRequirementsField
            value={formData.audioRequirements}
            onChange={(value) => onFieldChange("audioRequirements", value)}
            error={formErrors.audioRequirements}
          />
          <LightingRequirementsField
            value={formData.lightingRequirements}
            onChange={(value) => onFieldChange("lightingRequirements", value)}
            error={formErrors.lightingRequirements}
          />
          <SafetyRequirementsField
            value={formData.safetyRequirements}
            onChange={(value) => onFieldChange("safetyRequirements", value)}
            error={formErrors.safetyRequirements}
          />
        </div>
      </div>
    </div>
  );
}

