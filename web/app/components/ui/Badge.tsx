import { HTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
    
    const variants = {
      default: "bg-purple-main text-white border-purple-dark",
      outline: "border-border-light bg-bg-main text-text-primary",
    };

    return (
      <div
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

