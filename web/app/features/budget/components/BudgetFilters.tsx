import { Label } from "~/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";

interface BudgetFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const statusLabels: Record<string, string> = {
  SUBMITTED: "Submitted",
  REVISION_REQUESTED: "Revision Requested",
  APPROVED: "Approved",
};

const sortByLabels: Record<string, string> = {
  concertDate: "Concert Date",
  budgetAmount: "Budget Amount",
};

export function BudgetFilters({
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: BudgetFiltersProps) {
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
            <SelectItem value="SUBMITTED">{statusLabels.SUBMITTED}</SelectItem>
            <SelectItem value="REVISION_REQUESTED">{statusLabels.REVISION_REQUESTED}</SelectItem>
            <SelectItem value="APPROVED">{statusLabels.APPROVED}</SelectItem>
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
            <SelectItem value="budgetAmount">{sortByLabels.budgetAmount}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

