import {
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectItem,
  SearchableSelectTrigger,
} from "~/components/ui/SearchableSelect";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface ArtistSelectFieldProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
  artists: Array<{ id?: number; name?: string }>;
}

export function ArtistSelectField({ value, onChange, error, artists }: ArtistSelectFieldProps) {
  const selectedArtist = artists.find((artist) => artist.id === value);

  return (
    <FormFieldWrapper label="Artist" required error={error} htmlFor="artistId">
      <SearchableSelect
        value={String(value || "")}
        onValueChange={(val) => onChange(Number.parseInt(val))}
      >
        <SearchableSelectTrigger
          className={error ? "border-red-500" : ""}
          id="artistId"
        >
          {selectedArtist?.name || "Select an artist"}
        </SearchableSelectTrigger>
        <SearchableSelectContent searchPlaceholder="Search artist...">
          {artists.map((artist) => (
            <SearchableSelectItem
              key={artist.id}
              value={String(artist.id)}
              filterText={artist.name}
            >
              {artist.name}
            </SearchableSelectItem>
          ))}
        </SearchableSelectContent>
      </SearchableSelect>
    </FormFieldWrapper>
  );
}

