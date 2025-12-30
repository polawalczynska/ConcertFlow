import { Input } from "~/components/ui/Input";
import { Search } from "lucide-react";

interface TechnicalSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TechnicalSearch({ searchQuery, onSearchChange }: TechnicalSearchProps) {
  return (
    <div className="relative mb-3">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
      <Input
        placeholder="Search concerts, artists..."
        className="pl-9"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

