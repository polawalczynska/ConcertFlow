import { ApprovedTechnicalByMonthChart } from "./ApprovedTechnicalByMonthChart";
import { TechnicalStatusDistributionChart } from "./TechnicalStatusDistributionChart";
import { TechnicalAreasChart } from "./TechnicalAreasChart";

interface TechnicalChartsSectionProps {
  approvedByMonth: Array<{ month: string; approvedCount: number }>;
  statusDistribution: Array<{ name: string; value: number; color: string }>;
  technicalAreas: Array<{ area: string; count: number; color: string }>;
}

export function TechnicalChartsSection({
  approvedByMonth,
  statusDistribution,
  technicalAreas,
}: TechnicalChartsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ApprovedTechnicalByMonthChart data={approvedByMonth} />
        <TechnicalStatusDistributionChart data={statusDistribution} />
      </div>
      <TechnicalAreasChart data={technicalAreas} />
    </div>
  );
}

