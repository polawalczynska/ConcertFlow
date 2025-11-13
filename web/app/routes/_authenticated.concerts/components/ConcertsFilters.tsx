import { Input } from "~/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "~/components/ui/Select";
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
          placeholder="Search by concert name or artist..."
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
        <Select value={artistIdFilter} onValueChange={onArtistIdFilterChange}>
          <SelectTrigger className="w-48">
            <span>{artistIdFilter === "all" ? "Artist" : displayArtist}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artists</SelectItem>
            {artists.map((artist) => (
              <SelectItem key={artist.id} value={String(artist.id)}>
                {artist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

