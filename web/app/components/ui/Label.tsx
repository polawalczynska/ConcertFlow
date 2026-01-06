import { LabelHTMLAttributes, forwardRef } from "react";
import { cn } from "~/shared/utils";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium text-text-primary",
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";


