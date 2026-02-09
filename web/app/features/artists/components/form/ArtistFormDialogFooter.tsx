import { Button } from "~/components/ui/Button";
import {
  DialogFooter,
} from "~/components/ui/Dialog";
import type { ArtistResponse } from "~/api";

interface ArtistFormDialogFooterProps {
  selectedArtist: ArtistResponse | null;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function ArtistFormDialogFooter({
  selectedArtist,
  isSubmitting,
  onCancel,
}: ArtistFormDialogFooterProps) {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" className="bg-blue-main hover:bg-blue-dark" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : selectedArtist ? "Update Artist" : "Create Artist"}
      </Button>
    </DialogFooter>
  );
}

