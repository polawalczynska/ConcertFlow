import { Input } from "~/components/ui/Input";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface ConcertNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ConcertNameField({ value, onChange, error }: ConcertNameFieldProps) {
  return (
    <FormFieldWrapper label="Concert Name" required error={error} htmlFor="name">
      <Input
        id="name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
        placeholder="Enter concert name"
      />
    </FormFieldWrapper>
  );
}

