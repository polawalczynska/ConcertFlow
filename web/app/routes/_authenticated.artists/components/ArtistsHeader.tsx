import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";

interface ArtistsHeaderProps {
  onAddArtist: () => void;
}

export function ArtistsHeader({ onAddArtist }: ArtistsHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Artists</h1>
        <p className="mt-1 text-sm text-text-secondary">Manage your roster of performing artists</p>
      </div>
      <Button onClick={onAddArtist} className="bg-purple-main hover:bg-purple-dark">
        <Plus className="mr-2 h-4 w-4" />
        Add Artist
      </Button>
    </div>
  );
}


