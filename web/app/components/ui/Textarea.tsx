import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-border-light bg-bg-main px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0 focus:border-border-light",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";


