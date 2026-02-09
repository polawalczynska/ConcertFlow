import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";

interface ConcertsHeaderProps {
  onAddConcert: () => void;
}

export function ConcertsHeader({ onAddConcert }: ConcertsHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Concert Management</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Create, view, and manage your concert events
        </p>
      </div>
            <Button onClick={onAddConcert} className="bg-pink-main hover:bg-pink-dark whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">New Concert</span>
              <span className="sm:hidden">New</span>
            </Button>
    </div>
  );
}

