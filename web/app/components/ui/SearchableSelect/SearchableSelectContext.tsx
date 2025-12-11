import { createContext, useContext } from "react";

interface SearchableSelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchableSelectContext = createContext<SearchableSelectContextValue | undefined>(
  undefined
);

export function useSearchableSelectContext() {
  const context = useContext(SearchableSelectContext);
  if (!context) {
    throw new Error("SearchableSelect components must be used within SearchableSelect");
  }
  return context;
}

