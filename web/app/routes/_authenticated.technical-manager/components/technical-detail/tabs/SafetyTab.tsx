import { CheckCircle2, AlertCircle, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { Label } from "~/components/ui/Label";
import type { TechnicalApproval } from "../../../data/mockTechnicalApprovals";

interface SafetyTabProps {
  approval: TechnicalApproval;
}

export function SafetyTab({ approval }: SafetyTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Safety & Compliance Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { item: "Fire Safety Permit", status: "complete", critical: true },
              { item: "Electrical Inspection", status: "complete", critical: true },
              { item: "Load-in Safety Plan", status: "complete", critical: false },
              { item: "Emergency Evacuation Plan", status: "complete", critical: true },
              { item: "Medical Staff On-site", status: "pending", critical: true },
              { item: "Pyrotechnics License", status: approval.technicalFlags.includes("pyro") ? "pending" : "complete", critical: approval.technicalFlags.includes("pyro") },
              { item: "Rigging Certification", status: "complete", critical: true },
            ].map((safety, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {safety.status === "complete" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  )}
                  <div>
                    <p className="font-medium">{safety.item}</p>
                    {safety.critical && <p className="text-xs text-red-600">Critical Requirement</p>}
                  </div>
                </div>
                <Badge className={safety.status === "complete" ? "bg-green-600" : "bg-orange-500"}>
                  {safety.status === "complete" ? "Complete" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {approval.technicalFlags.includes("pyro") && (
        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <Flame className="h-5 w-5" />
              Pyrotechnics Safety
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label>Safety Perimeter</Label>
                <p className="font-medium mt-1">15 meter radius - Clear zone required</p>
              </div>
              <div>
                <Label>Fire Marshal</Label>
                <p className="font-medium mt-1">On-site presence mandatory</p>
              </div>
              <div>
                <Label>Operator Certification</Label>
                <Badge className="bg-orange-600">Pending Verification</Badge>
              </div>
              <div>
                <Label>Emergency Shutdown</Label>
                <p className="font-medium mt-1">Wireless kill switch installed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

