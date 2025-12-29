import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import { Progress } from "~/components/ui/Progress";
import type { TechnicalApproval } from "../../../data/mockTechnicalApprovals";

interface RequirementsTabProps {
  approval: TechnicalApproval;
}

export function RequirementsTab({ approval }: RequirementsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Artist Technical Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Full Requirements</Label>
              <p className="mt-2 text-sm text-text-secondary whitespace-pre-wrap">
                {approval.technicalRequirements}
              </p>
            </div>
            <div>
              <Label>Compliance Score</Label>
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">Overall Compliance</span>
                  <span className="font-semibold">{approval.complianceScore}%</span>
                </div>
                <Progress value={approval.complianceScore} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

