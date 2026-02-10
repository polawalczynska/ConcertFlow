import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";
import { useUser } from "~/shared/hooks/domain";

interface ArtistsHeaderProps {
  onAddArtist: () => void;
}

export function ArtistsHeader({ onAddArtist }: ArtistsHeaderProps) {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";
  const isManager = user?.role === "BUDGET_MANAGER" || user?.role === "TECHNICAL_MANAGER";

  const subtitle = isCoordinator
    ? "Manage your roster of performing artists"
    : isManager
    ? "View performing artists and their information"
    : "Manage your roster of performing artists";

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Artists</h1>
        <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
      </div>
      {isCoordinator && (
        <Button onClick={onAddArtist} className="bg-pink-main hover:bg-pink-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Artist
        </Button>
      )}
    </div>
  );
}


