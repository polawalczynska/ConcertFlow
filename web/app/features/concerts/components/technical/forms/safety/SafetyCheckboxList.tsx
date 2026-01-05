import { SafetyCheckboxItem } from "./SafetyCheckboxItem";

interface SafetyCheckboxListProps {
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

export function SafetyCheckboxList({
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
}: SafetyCheckboxListProps) {
  return (
    <div className="space-y-3">
      <SafetyCheckboxItem
        id="fireSafetyPermit"
        label="Fire Safety Permit"
        checked={fireSafetyPermit}
        onChange={onFireSafetyPermitChange}
        required
        disabled={disabled}
      />
      <SafetyCheckboxItem
        id="electricalInspection"
        label="Electrical Inspection"
        checked={electricalInspection}
        onChange={onElectricalInspectionChange}
        required
        disabled={disabled}
      />
      <SafetyCheckboxItem
        id="loadInSafetyPlan"
        label="Load-in Safety Plan"
        checked={loadInSafetyPlan}
        onChange={onLoadInSafetyPlanChange}
        disabled={disabled}
      />
      <SafetyCheckboxItem
        id="emergencyEvacuationPlan"
        label="Emergency Evacuation Plan"
        checked={emergencyEvacuationPlan}
        onChange={onEmergencyEvacuationPlanChange}
        required
        disabled={disabled}
      />
      <SafetyCheckboxItem
        id="medicalStaffOnsite"
        label="Medical Staff On-site"
        checked={medicalStaffOnsite}
        onChange={onMedicalStaffOnsiteChange}
        required
        disabled={disabled}
      />
      <SafetyCheckboxItem
        id="pyrotechnicsLicense"
        label="Pyrotechnics License"
        checked={pyrotechnicsLicense}
        onChange={onPyrotechnicsLicenseChange}
        disabled={disabled}
      />
      <SafetyCheckboxItem
        id="riggingCertification"
        label="Rigging Certification"
        checked={riggingCertification}
        onChange={onRiggingCertificationChange}
        required
        disabled={disabled}
      />
    </div>
  );
}

