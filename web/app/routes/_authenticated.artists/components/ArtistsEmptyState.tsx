import { Button } from "~/components/ui/Button";
import { Music, Plus } from "lucide-react";

interface ArtistsEmptyStateProps {
  hasSearchQuery: boolean;
  onAddArtist: () => void;
}

export function ArtistsEmptyState({hasSearchQuery, onAddArtist}: ArtistsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl p-12">
      <Music className="mb-4 h-12 w-12 text-text-muted"/>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">No artists found</h3>
      <p className="mb-4 text-sm text-text-secondary">
        {hasSearchQuery ? "Try adjusting your search" : "Get started by adding your first artist"}
      </p>
      {!hasSearchQuery && (
        <Button onClick={onAddArtist} className="bg-purple-main hover:bg-purple-dark">
          <Plus className="mr-2 h-4 w-4"/>
          Add Artist
        </Button>
      )}
    </div>
  );
}


