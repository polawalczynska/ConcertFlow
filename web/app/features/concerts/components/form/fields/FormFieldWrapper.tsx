import { ReactNode } from "react";
import { Label } from "~/components/ui/Label";

interface FormFieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function FormFieldWrapper({
  label,
  required = false,
  error,
  children,
  htmlFor,
}: FormFieldWrapperProps) {
  return (
    <div className="sm:col-span-3">
      <Label htmlFor={htmlFor}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

