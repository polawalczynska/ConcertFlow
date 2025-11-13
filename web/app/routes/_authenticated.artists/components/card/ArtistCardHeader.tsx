import { Button } from "~/components/ui/Button";
import { Music, Edit, Trash2 } from "lucide-react";
import type { ArtistResponse } from "~/api";

interface ArtistCardHeaderProps {
  artist: ArtistResponse;
  onEdit: (artist: ArtistResponse) => void;
  onDelete: (artist: ArtistResponse) => void;
}

export function ArtistCardHeader({ artist, onEdit, onDelete }: ArtistCardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">{artist.name}</h3>
        {artist.genre && (
          <div className="mt-1 flex items-center gap-1 text-sm text-purple-main">
            <Music className="h-3 w-3" />
            <span>{artist.genre}</span>
          </div>
        )}
      </div>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(artist)}
          className="h-8 w-8 p-0 text-text-secondary hover:text-purple-main"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(artist)}
          className="h-8 w-8 p-0 text-text-secondary hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

