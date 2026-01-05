import { Input } from "~/components/ui/Input";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface CityFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CityField({ value, onChange, error }: CityFieldProps) {
  return (
    <FormFieldWrapper label="City" required error={error} htmlFor="city">
      <Input
        id="city"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
        placeholder="Enter city name"
      />
    </FormFieldWrapper>
  );
}

