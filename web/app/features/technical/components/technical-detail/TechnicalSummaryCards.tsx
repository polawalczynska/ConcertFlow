import { Card, CardContent } from "~/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "~/shared/hooks/domain";
import { technicalApi } from "~/lib/api-client";
import type { TechnicalApproval } from "../../types/TechnicalApproval";

interface TechnicalSummaryCardsProps {
  approval: TechnicalApproval;
}

function calculateSafetyItemsCount(safety: { fireSafetyPermit?: boolean; electricalInspection?: boolean; loadInSafetyPlan?: boolean; emergencyEvacuationPlan?: boolean; medicalStaffOnsite?: boolean; pyrotechnicsLicense?: boolean; riggingCertification?: boolean } | null | undefined): number {
  if (!safety) return 0;
  let count = 0;
  if (safety.fireSafetyPermit) count++;
  if (safety.electricalInspection) count++;
  if (safety.loadInSafetyPlan) count++;
  if (safety.emergencyEvacuationPlan) count++;
  if (safety.medicalStaffOnsite) count++;
  if (safety.pyrotechnicsLicense) count++;
  if (safety.riggingCertification) count++;
  return count;
}

export function TechnicalSummaryCards({ approval }: TechnicalSummaryCardsProps) {
  const { data: user } = useUser();
  
  const { data: technicalDetails } = useQuery({
    queryKey: ["technical-details", approval.concertId, user?.id],
    queryFn: async () => {
      if (!user?.id || !approval.concertId) return null;
      const response = await technicalApi.getTechnicalDetails(
        approval.concertId,
        user.id
      );
      return response.data;
    },
    enabled: !!user?.id && !!approval.concertId,
  });

  const safetyItemsCount = calculateSafetyItemsCount(technicalDetails?.safety);
  const totalSafetyItems = 7;

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
          <p className="text-xs text-blue-700">Safety Items</p>
          <p className="mt-1 text-2xl font-bold text-blue-700">
            {safetyItemsCount}/{totalSafetyItems}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 bg-pink-50 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-pink-700">Days Until Concert</p>
          <p className="mt-1 text-2xl font-bold text-pink-700">
            {approval.daysUntil}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

