import { RevenueChart } from "./RevenueChart";
import { GenreDistributionChart } from "./GenreDistributionChart";
import { StatusDistributionChart } from "./StatusDistributionChart";

interface RevenueData {
  month: string;
  revenue: number;
  concerts: number;
  tickets: number;
}

interface GenreData {
  name: string;
  value: number;
  color: string;
}

interface StatusData {
  status: string;
  count: number;
  color: string;
}

interface ChartsSectionProps {
  revenueData: RevenueData[];
  genreData: GenreData[];
  statusData: StatusData[];
}

export function ChartsSection({ revenueData, genreData, statusData }: ChartsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart data={revenueData} />
        <GenreDistributionChart data={genreData} />
      </div>
      <StatusDistributionChart data={statusData} />
    </div>
  );
}

