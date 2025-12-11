import { useEffect, useRef, useState, ReactNode } from "react";
import { SearchableSelectContext } from "./SearchableSelectContext";

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  searchPlaceholder?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  children,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
        setSearchQuery("");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        setSearchQuery("");
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
    <SearchableSelectContext.Provider
      value={{ value, onValueChange, open, setOpen, searchQuery, setSearchQuery }}
    >
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </SearchableSelectContext.Provider>
  );
}

