import { CheckCircle2, AlertCircle, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { Label } from "~/components/ui/Label";
import type { TechnicalApproval } from "../../../data/mockTechnicalApprovals";
import type { TechnicalDetailResponse } from "~/api";

interface SafetyTabProps {
  approval: TechnicalApproval;
  technicalDetails?: TechnicalDetailResponse | null;
}

export function SafetyTab({ approval, technicalDetails }: SafetyTabProps) {
  const safety = technicalDetails?.safety;
  const hasPyro = approval.technicalFlags.includes("pyro");

  const safetyItems = [
    { 
      item: "Fire Safety Permit", 
      checked: safety?.fireSafetyPermit || false, 
      required: true 
    },
    { 
      item: "Electrical Inspection", 
      checked: safety?.electricalInspection || false, 
      required: true 
    },
    { 
      item: "Load-in Safety Plan", 
      checked: safety?.loadInSafetyPlan || false, 
      required: false 
    },
    { 
      item: "Emergency Evacuation Plan", 
      checked: safety?.emergencyEvacuationPlan || false, 
      required: true 
    },
    { 
      item: "Medical Staff On-site", 
      checked: safety?.medicalStaffOnsite || false, 
      required: true 
    },
    { 
      item: "Pyrotechnics License", 
      checked: safety?.pyrotechnicsLicense || false, 
      required: hasPyro 
    },
    { 
      item: "Rigging Certification", 
      checked: safety?.riggingCertification || false, 
      required: true 
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Safety & Compliance Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {safetyItems.map((safetyItem, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {safetyItem.checked ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  )}
                  <div>
                    <p className="font-medium">{safetyItem.item}</p>
                    {safetyItem.required && !safetyItem.checked && (
                      <p className="text-xs text-red-600">Required</p>
                    )}
                  </div>
                </div>
                <Badge className={safetyItem.checked ? "bg-green-600" : "bg-orange-500"}>
                  {safetyItem.checked ? "Provided" : "Not Provided"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {hasPyro && (
        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <Flame className="h-5 w-5" />
              Pyrotechnics Safety Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-red-900">
                This concert includes pyrotechnics. Please verify that all safety requirements are met:
              </p>
              <ul className="list-disc list-inside text-sm text-red-900 space-y-1 ml-2">
                <li>Pyrotechnics license is provided: {safety?.pyrotechnicsLicense ? "✓ Yes" : "✗ No"}</li>
                <li>Safety perimeter and clear zones are established</li>
                <li>Fire marshal presence is confirmed</li>
                <li>Operator certification is verified</li>
                <li>Emergency shutdown procedures are in place</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

