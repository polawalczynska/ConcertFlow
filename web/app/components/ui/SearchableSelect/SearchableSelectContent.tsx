import { useEffect, useRef, ReactNode } from "react";
import { cn } from "~/lib/utils";
import { Input } from "../Input";
import { useSearchableSelectContext } from "./SearchableSelectContext";

interface SearchableSelectContentProps {
  children: ReactNode;
  className?: string;
  searchPlaceholder?: string;
}

export function SearchableSelectContent({
  children,
  className,
  searchPlaceholder = "Search...",
}: SearchableSelectContentProps) {
  const { open, searchQuery, setSearchQuery } = useSearchableSelectContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      const trigger = contentRef.current.parentElement?.querySelector("button");
      if (trigger) {
        const triggerWidth = trigger.offsetWidth;
        const minWidth = 200;
        const contentWidth = Math.max(triggerWidth, minWidth);
        contentRef.current.style.width = `${contentWidth}px`;
        contentRef.current.style.minWidth = `${contentWidth}px`;
      }

      const rect = contentRef.current.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        contentRef.current.style.bottom = "100%";
        contentRef.current.style.top = "auto";
        contentRef.current.style.marginTop = "0";
        contentRef.current.style.marginBottom = "0.5rem";
      } else {
        contentRef.current.style.top = "100%";
        contentRef.current.style.bottom = "auto";
        contentRef.current.style.marginTop = "0.5rem";
        contentRef.current.style.marginBottom = "0";
      }

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 max-h-60 overflow-auto rounded-lg border border-border-light bg-bg-main shadow-xl",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200",
        className
      )}
      style={{
        transformOrigin: "top",
      }}
    >
      <div className="p-2 border-b border-border-light">
        <Input
          ref={inputRef}
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="p-1 max-h-48 overflow-auto">{children}</div>
    </div>
  );
}

