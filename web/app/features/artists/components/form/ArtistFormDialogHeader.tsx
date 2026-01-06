import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/Dialog";
import type { ArtistResponse } from "~/api";

interface ArtistFormDialogHeaderProps {
  selectedArtist: ArtistResponse | null;
}

export function ArtistFormDialogHeader({ selectedArtist }: ArtistFormDialogHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{selectedArtist ? "Edit Artist" : "Add New Artist"}</DialogTitle>
      <DialogDescription>
        {selectedArtist ? "Update the artist information below." : "Fill in the details to add a new artist."}
      </DialogDescription>
    </DialogHeader>
  );
}

