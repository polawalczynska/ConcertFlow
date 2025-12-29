import { Label } from "~/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";

interface TechnicalFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const sortByLabels: Record<string, string> = {
  concertDate: "Concert Date",
  artistName: "Artist Name",
  concertName: "Concert Name",
};

export function TechnicalFilters({
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: TechnicalFiltersProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-border bg-bg-main p-4 md:grid-cols-2">
      <div>
        <Label className="text-xs">Status</Label>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="All Statuses">
              {statusFilter === "all" ? "All Statuses" : statusLabels[statusFilter] || statusFilter}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PENDING">{statusLabels.PENDING}</SelectItem>
            <SelectItem value="APPROVED">{statusLabels.APPROVED}</SelectItem>
            <SelectItem value="REJECTED">{statusLabels.REJECTED}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Concert Date">
              {sortByLabels[sortBy] || sortBy}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concertDate">{sortByLabels.concertDate}</SelectItem>
            <SelectItem value="artistName">{sortByLabels.artistName}</SelectItem>
            <SelectItem value="concertName">{sortByLabels.concertName}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

