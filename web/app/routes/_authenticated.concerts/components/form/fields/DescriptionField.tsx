import { Textarea } from "~/components/ui/Textarea";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptionField({ value, onChange }: DescriptionFieldProps) {
  return (
    <FormFieldWrapper label="Description" htmlFor="description">
      <Textarea
        id="description"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter concert description"
        rows={2}
      />
    </FormFieldWrapper>
  );
}

