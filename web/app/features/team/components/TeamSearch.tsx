import { Input } from "~/components/ui/Input";
import { Search } from "lucide-react";

interface TeamSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TeamSearch({ searchQuery, onSearchChange }: TeamSearchProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input
          placeholder="Search team members by name, email, or role..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

