import type { ArtistResponse } from "~/api";
import { ArtistCardHeader } from "~/routes/_authenticated.artists/components/card/ArtistCardHeader";
import { ArtistCardContactInfo } from "~/routes/_authenticated.artists/components/card/ArtistCardContactInfo";
import { ArtistCardFooter } from "~/routes/_authenticated.artists/components/card/ArtistCardFooter";

interface ArtistCardProps {
  artist: ArtistResponse;
  onEdit: (artist: ArtistResponse) => void;
  onDelete: (artist: ArtistResponse) => void;
}

export function ArtistCard({ artist, onEdit, onDelete }: ArtistCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border-light bg-bg-card transition-all hover:shadow-card-hover">
      <div className="p-6">
        <ArtistCardHeader artist={artist} onEdit={onEdit} onDelete={onDelete} />
        <ArtistCardContactInfo artist={artist} />
        <ArtistCardFooter upcomingConcertsCount={artist.upcomingConcertsCount} />
      </div>
    </div>
  );
}


