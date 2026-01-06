import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import type { SafetyRequirementsDto } from "~/api";

interface SafetyRequirementsViewProps {
  safety: SafetyRequirementsDto;
}

const safetyItems = [
  { label: "Fire Safety Permit", key: "fireSafetyPermit" as const },
  { label: "Electrical Inspection", key: "electricalInspection" as const },
  { label: "Load-in Safety Plan", key: "loadInSafetyPlan" as const },
  { label: "Emergency Evacuation Plan", key: "emergencyEvacuationPlan" as const },
  { label: "Medical Staff On-site", key: "medicalStaffOnsite" as const },
  { label: "Pyrotechnics License", key: "pyrotechnicsLicense" as const },
  { label: "Rigging Certification", key: "riggingCertification" as const },
];

export function SafetyRequirementsView({ safety }: SafetyRequirementsViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Safety & Compliance Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {safetyItems.map((item) => {
            const value = safety[item.key];
            return (
              <div key={item.key} className="flex items-center justify-between py-2 border-b last:border-0">
                <Label className="text-sm font-medium text-text-secondary">{item.label}</Label>
                <span className={`text-sm font-medium ${value ? "text-green-600" : "text-gray-400"}`}>
                  {value ? "✓ Required" : "Not Required"}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

