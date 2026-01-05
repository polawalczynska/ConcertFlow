import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { SafetyCheckboxList } from "./safety/SafetyCheckboxList";

interface SafetyRequirementsFormProps {
  fireSafetyPermit: boolean;
  electricalInspection: boolean;
  loadInSafetyPlan: boolean;
  emergencyEvacuationPlan: boolean;
  medicalStaffOnsite: boolean;
  pyrotechnicsLicense: boolean;
  riggingCertification: boolean;
  onFireSafetyPermitChange: (value: boolean) => void;
  onElectricalInspectionChange: (value: boolean) => void;
  onLoadInSafetyPlanChange: (value: boolean) => void;
  onEmergencyEvacuationPlanChange: (value: boolean) => void;
  onMedicalStaffOnsiteChange: (value: boolean) => void;
  onPyrotechnicsLicenseChange: (value: boolean) => void;
  onRiggingCertificationChange: (value: boolean) => void;
  disabled?: boolean;
}

export function SafetyRequirementsForm({
  fireSafetyPermit,
  electricalInspection,
  loadInSafetyPlan,
  emergencyEvacuationPlan,
  medicalStaffOnsite,
  pyrotechnicsLicense,
  riggingCertification,
  onFireSafetyPermitChange,
  onElectricalInspectionChange,
  onLoadInSafetyPlanChange,
  onEmergencyEvacuationPlanChange,
  onMedicalStaffOnsiteChange,
  onPyrotechnicsLicenseChange,
  onRiggingCertificationChange,
  disabled = false,
}: SafetyRequirementsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Safety & Compliance Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <SafetyCheckboxList
          fireSafetyPermit={fireSafetyPermit}
          electricalInspection={electricalInspection}
          loadInSafetyPlan={loadInSafetyPlan}
          emergencyEvacuationPlan={emergencyEvacuationPlan}
          medicalStaffOnsite={medicalStaffOnsite}
          pyrotechnicsLicense={pyrotechnicsLicense}
          riggingCertification={riggingCertification}
          onFireSafetyPermitChange={onFireSafetyPermitChange}
          onElectricalInspectionChange={onElectricalInspectionChange}
          onLoadInSafetyPlanChange={onLoadInSafetyPlanChange}
          onEmergencyEvacuationPlanChange={onEmergencyEvacuationPlanChange}
          onMedicalStaffOnsiteChange={onMedicalStaffOnsiteChange}
          onPyrotechnicsLicenseChange={onPyrotechnicsLicenseChange}
          onRiggingCertificationChange={onRiggingCertificationChange}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}

