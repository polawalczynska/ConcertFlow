import { Card, CardContent } from "~/components/ui/Card";
import type { TechnicalApproval } from "../../data/mockTechnicalApprovals";

interface TechnicalSummaryCardsProps {
  approval: TechnicalApproval;
}

export function TechnicalSummaryCards({ approval }: TechnicalSummaryCardsProps) {
  return (
    <div className="grid gap-4 mb-6 grid-cols-3">
      <Card className="border-0 bg-bg-main shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-text-secondary">Technical Flags</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">
            {approval.technicalFlags.length}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 bg-blue-50 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-blue-700">Compliance Score</p>
          <p className="mt-1 text-2xl font-bold text-blue-700">
            {approval.complianceScore}%
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 bg-purple-50 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-purple-700">Days Until Concert</p>
          <p className="mt-1 text-2xl font-bold text-purple-700">
            {approval.daysUntil}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

