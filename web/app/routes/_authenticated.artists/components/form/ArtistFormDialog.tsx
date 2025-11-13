import {
  Dialog,
  DialogContent,
} from "~/components/ui/Dialog";
import type { ArtistResponse, ArtistRequest } from "~/api";
import { ArtistFormDialogHeader } from "~/routes/_authenticated.artists/components/form/ArtistFormDialogHeader";
import { ArtistFormError } from "~/routes/_authenticated.artists/components/form/ArtistFormError";
import { ArtistFormFields } from "~/routes/_authenticated.artists/components/form/ArtistFormFields";
import { ArtistFormDialogFooter } from "~/routes/_authenticated.artists/components/form/ArtistFormDialogFooter";

interface ArtistFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedArtist: ArtistResponse | null;
  formData: ArtistRequest;
  formErrors: Record<string, string>;
  generalError?: string | null;
  isSubmitting: boolean;
  onFormDataChange: (data: ArtistRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ArtistFormDialog({
  isOpen,
  onOpenChange,
  selectedArtist,
  formData,
  formErrors,
  generalError,
  isSubmitting,
  onFormDataChange,
  onSubmit,
}: ArtistFormDialogProps) {
  const handleFieldChange = (field: keyof ArtistRequest, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <ArtistFormDialogHeader selectedArtist={selectedArtist} />
        <form onSubmit={onSubmit}>
          {generalError && <ArtistFormError message={generalError} />}
          <ArtistFormFields
            formData={formData}
            formErrors={formErrors}
            onFieldChange={handleFieldChange}
          />
          <ArtistFormDialogFooter
            selectedArtist={selectedArtist}
            isSubmitting={isSubmitting}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}


