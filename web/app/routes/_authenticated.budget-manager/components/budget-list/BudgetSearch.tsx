import { Input } from "~/components/ui/Input";
import { Search } from "lucide-react";

interface BudgetSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BudgetSearch({ searchQuery, onSearchChange }: BudgetSearchProps) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
      <Input
        placeholder="Search budgets..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

