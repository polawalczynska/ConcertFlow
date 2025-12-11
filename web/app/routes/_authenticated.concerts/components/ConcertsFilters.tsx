import { Input } from "~/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "~/components/ui/Select";
import {
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectItem,
  SearchableSelectTrigger,
} from "~/components/ui/SearchableSelect";
import { Search } from "lucide-react";

interface ConcertsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  artistIdFilter: string;
  onArtistIdFilterChange: (value: string) => void;
  artists: Array<{ id?: number; name?: string }>;
}

export function ConcertsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  artistIdFilter,
  onArtistIdFilterChange,
  artists,
}: ConcertsFiltersProps) {
  const statusLabels: Record<string, string> = {
    all: "All Status",
    PLANNING: "Planning",
    APPROVED: "Approved",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };

  const selectedArtist = artists.find((artist) => artist.id?.toString() === artistIdFilter);
  const displayStatus = statusLabels[statusFilter] || "Status";
  const displayArtist = selectedArtist?.name || "Artist";

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <Input
          placeholder="Search by concert name..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-48">
            <span className="px-1">{statusFilter === "all" ? "Status" : displayStatus}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PLANNING">Planning</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <SearchableSelect
          value={artistIdFilter}
          onValueChange={onArtistIdFilterChange}
          placeholder="Artist"
          searchPlaceholder="Search artist..."
        >
          <SearchableSelectTrigger className="w-48">
            {artistIdFilter === "all" ? "Artist" : displayArtist}
          </SearchableSelectTrigger>
          <SearchableSelectContent searchPlaceholder="Search artist...">
            <SearchableSelectItem value="all">All Artists</SearchableSelectItem>
            {artists.map((artist) => (
              <SearchableSelectItem
                key={artist.id}
                value={String(artist.id)}
                filterText={artist.name}
              >
                {artist.name}
              </SearchableSelectItem>
            ))}
          </SearchableSelectContent>
        </SearchableSelect>
      </div>
    </div>
  );
}

