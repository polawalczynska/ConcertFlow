import { ReactNode } from "react";
import { cn } from "~/shared/utils";
import { useSearchableSelectContext } from "./SearchableSelectContext";

interface SearchableSelectItemProps {
  value: string;
  children: ReactNode;
  className?: string;
  filterText?: string;
  filterFn?: (item: string, searchQuery: string) => boolean;
}

export function SearchableSelectItem({
  value,
  children,
  className,
  filterText,
  filterFn,
}: SearchableSelectItemProps) {
  const { value: selectedValue, onValueChange, setOpen, searchQuery, setSearchQuery } =
    useSearchableSelectContext();
  const isSelected = selectedValue === value;

  const defaultFilterFn = (item: string, query: string) => {
    if (!query) return true;
    return item.toLowerCase().includes(query.toLowerCase());
  };

  const textToFilter = filterText || (typeof children === "string" ? children : String(children));
  const shouldShow = filterFn
    ? filterFn(textToFilter, searchQuery)
    : defaultFilterFn(textToFilter, searchQuery);

  if (!shouldShow) return null;

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 text-sm outline-none transition-all duration-150",
        "hover:bg-pink-main/10",
        isSelected && "bg-pink-main/10 text-pink-main font-medium",
        className
      )}
      onClick={() => {
        onValueChange(value);
        setOpen(false);
        setSearchQuery("");
      }}
    >
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-pink-main rounded-r-full" />
      )}
      <span className={cn(isSelected && "text-pink-main")}>{children}</span>
    </div>
  );
}

