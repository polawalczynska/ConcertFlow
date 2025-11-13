import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border-light bg-bg-main px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0 focus:border-border-light",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";


