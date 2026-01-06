import { createContext, forwardRef, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { cn } from "~/shared/utils";
import { ChevronDown } from "lucide-react";

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  hoveredValue: string | null;
  setHoveredValue: (value: string | null) => void;
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select");
  }
  return context;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export function Select({value, onValueChange, children}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open]);

  return (
    <SelectContext.Provider value={{value, onValueChange, open, setOpen, hoveredValue, setHoveredValue}}>
      <div ref={containerRef} className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({className, children, ...props}, ref) => {
  const {open, setOpen} = useSelectContext();
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
      {children}
      <div
        className={cn(
          "flex items-center justify-center transition-transform duration-200",
          open && "rotate-180"
        )}
      >
        <ChevronDown className="h-4 w-4"/>
      </div>
    </button>
  );
});

SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({placeholder, children}: { placeholder?: string; children?: ReactNode }) {
  const {value} = useSelectContext();
  if (children !== undefined) {
    return <span>{children || <span className="text-text-secondary">{placeholder}</span>}</span>;
  }
  return <span>{value || <span className="text-text-secondary">{placeholder}</span>}</span>;
}

export function SelectContent({children, className}: { children: ReactNode; className?: string }) {
  const {open} = useSelectContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      const trigger = contentRef.current.parentElement?.querySelector('button');
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
      <div className="p-1">{children}</div>
    </div>
  );
}

export function SelectItem({
                             value,
                             children,
                             className,
                           }: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const {value: selectedValue, onValueChange, setOpen, hoveredValue, setHoveredValue} = useSelectContext();
  const isSelected = selectedValue === value;
  const isHovered = hoveredValue === value;

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-150",
        "hover:bg-purple-main/10",
        isSelected && "bg-purple-main/10 text-purple-main font-medium",
        isHovered && !isSelected && "bg-bg-secondary",
        className
      )}
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
      onMouseEnter={() => setHoveredValue(value)}
      onMouseLeave={() => setHoveredValue(null)}
    >
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-main rounded-r-full"/>
      )}
      <span className={cn(isSelected && "text-purple-main")}>{children}</span>
    </div>
  );
}
