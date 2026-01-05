import type { ArtistResponse } from "~/api";
import { ArtistCard } from "~/routes/_authenticated.artists/components/card/ArtistCard";
import { ArtistsEmptyState } from "~/routes/_authenticated.artists/components/ArtistsEmptyState";

interface ArtistsListProps {
  artists: ArtistResponse[];
  isLoading: boolean;
  searchQuery: string;
  onEdit: (artist: ArtistResponse) => void;
  onDelete: (artist: ArtistResponse) => void;
  onAddArtist: () => void;
}

export function ArtistsList({
  artists,
  isLoading,
  searchQuery,
  onEdit,
  onDelete,
  onAddArtist,
}: ArtistsListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 animate-pulse rounded-xl bg-bg-card border border-border-light" />
        ))}
      </div>
    );
  }

  if (artists.length === 0) {
    return <ArtistsEmptyState hasSearchQuery={!!searchQuery} onAddArtist={onAddArtist} />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

