import type { ArtistRequest } from "~/api";
import { ArtistFormField } from "~/features/artists/components/form/ArtistFormField";

interface ArtistFormFieldsProps {
  formData: ArtistRequest;
  formErrors: Record<string, string>;
  onFieldChange: (field: keyof ArtistRequest, value: string) => void;
}

export function ArtistFormFields({formData, formErrors, onFieldChange}: ArtistFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4 sm:grid-cols-2">
      <ArtistFormField
        id="name"
        label="Artist Name"
        required
        error={formErrors.name}
        value={formData.name}
        onChange={(value) => onFieldChange("name", value)}
        placeholder="Enter artist name"
        spanFull
      />

      <ArtistFormField
        id="genre"
        label="Genre"
        error={formErrors.genre}
        value={formData.genre || ""}
        onChange={(value) => onFieldChange("genre", value)}
        placeholder="e.g., Rock, Jazz, Electronic"
      />

      <ArtistFormField
        id="email"
        label="Email"
        required
        type="email"
        error={formErrors.email}
        value={formData.email}
        onChange={(value) => onFieldChange("email", value)}
        placeholder="artist@example.com"
      />

      <ArtistFormField
        id="phone"
        label="Phone"
        type="tel"
        error={formErrors.phone}
        value={formData.phone || ""}
        onChange={(value) => onFieldChange("phone", value)}
        placeholder="+1 555 0100"
      />

      <ArtistFormField
        id="website"
        label="Website"
        type="text"
        error={formErrors.website}
        value={formData.website || ""}
        onChange={(value) => onFieldChange("website", value)}
        placeholder="www.artist-website.com"
      />

      <ArtistFormField
        id="contactPerson"
        label="Contact Person"
        error={formErrors.contactPerson}
        value={formData.contactPerson || ""}
        onChange={(value) => onFieldChange("contactPerson", value)}
        placeholder="Manager or booking agent name"
      />
    </div>
  );
}

