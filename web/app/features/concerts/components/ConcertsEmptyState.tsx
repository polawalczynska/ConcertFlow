import { Button } from "~/components/ui/Button";
import { Music, Plus } from "lucide-react";

interface ConcertsEmptyStateProps {
  hasSearchQuery: boolean;
  onAddConcert: () => void;
}

export function ConcertsEmptyState({hasSearchQuery, onAddConcert}: ConcertsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl p-12">
      <Music className="mb-4 h-12 w-12 text-text-muted"/>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">
        {hasSearchQuery ? "No concerts found" : "No concerts yet"}
      </h3>
      <p className="mb-4 text-sm text-text-secondary">
        {hasSearchQuery
          ? "Try adjusting your search or filters"
          : "Get started by creating your first concert"}
      </p>
      {!hasSearchQuery && (
        <Button onClick={onAddConcert} className="bg-blue-main hover:bg-blue-dark">
          <Plus className="mr-2 h-4 w-4"/>
          New Concert
        </Button>
      )}
    </div>
  );
}

