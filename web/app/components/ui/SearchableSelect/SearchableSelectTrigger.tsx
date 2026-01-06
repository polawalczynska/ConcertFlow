import { forwardRef, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/shared/utils";
import { useSearchableSelectContext } from "./SearchableSelectContext";

export const SearchableSelectTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { placeholder?: string }
>(({ className, children, placeholder, ...props }, ref) => {
  const { open, setOpen } = useSearchableSelectContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref || buttonRef}
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-border-light bg-bg-main px-3 py-2 text-sm text-text-primary",
        "hover:bg-bg-secondary transition-all duration-200",
        open && "bg-bg-secondary border-purple-main",
        className
      )}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="true"
      {...props}
    >
      {children || <span className="text-text-secondary">{placeholder}</span>}
      <div
        className={cn(
          "flex items-center justify-center transition-transform duration-200",
          open && "rotate-180"
        )}
      >
        <ChevronDown className="h-4 w-4" />
      </div>
    </button>
  );
});

SearchableSelectTrigger.displayName = "SearchableSelectTrigger";

