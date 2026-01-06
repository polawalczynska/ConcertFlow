import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";

interface ArtistFormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  type?: "text" | "email" | "tel" | "url";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  spanFull?: boolean;
}

export function ArtistFormField({
  id,
  label,
  required = false,
  error,
  type = "text",
  value,
  onChange,
  placeholder,
  rows,
  spanFull = false,
}: ArtistFormFieldProps) {
  const isTextarea = rows !== undefined;

  return (
    <div className={`grid gap-2 ${spanFull ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {isTextarea ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

