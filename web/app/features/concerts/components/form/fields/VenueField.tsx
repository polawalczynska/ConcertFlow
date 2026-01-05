import { Input } from "~/components/ui/Input";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface VenueFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function VenueField({ value, onChange, error }: VenueFieldProps) {
  return (
    <FormFieldWrapper label="Venue" required error={error} htmlFor="venue">
      <Input
        id="venue"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
        placeholder="Enter venue name"
      />
    </FormFieldWrapper>
  );
}

