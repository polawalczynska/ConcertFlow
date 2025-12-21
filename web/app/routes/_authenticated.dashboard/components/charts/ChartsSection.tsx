import { RevenueChart } from "./RevenueChart";
import { GenreDistributionChart } from "./GenreDistributionChart";
import { StatusDistributionChart } from "./StatusDistributionChart";

interface ConcertsByMonthData {
  month: string;
  concertCount: number;
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
  concertsByMonthData: ConcertsByMonthData[];
  genreData: GenreData[];
  statusData: StatusData[];
}

export function ChartsSection({ concertsByMonthData, genreData, statusData }: ChartsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart data={concertsByMonthData} />
        <GenreDistributionChart data={genreData} />
      </div>
      <StatusDistributionChart data={statusData} />
    </div>
  );
}

