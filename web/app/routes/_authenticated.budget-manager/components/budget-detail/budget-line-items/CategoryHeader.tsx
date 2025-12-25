import { Badge } from "~/components/ui/Badge";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CategoryHeaderProps {
  category: string;
  itemCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CategoryHeader({ category, itemCount, isExpanded, onToggle }: CategoryHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between p-3 hover:bg-bg-secondary"
    >
      <div className="flex items-center gap-2">
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <span className="font-semibold text-text-primary">{category}</span>
        <Badge variant="outline">{itemCount} items</Badge>
      </div>
    </button>
  );
}

