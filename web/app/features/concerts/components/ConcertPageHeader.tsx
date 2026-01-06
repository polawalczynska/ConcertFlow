import { Button } from "~/components/ui/Button";
import { ArrowLeft, Edit, Trash2, X } from "lucide-react";
import type { ConcertResponse } from "~/api";

interface ConcertPageHeaderProps {
  concert: ConcertResponse;
  isCoordinator: boolean;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export function ConcertPageHeader({
  concert,
  isCoordinator,
  onBack,
  onEdit,
  onDelete,
  onCancel,
}: ConcertPageHeaderProps) {
  const canEdit = concert.status === "PLANNING" || concert.status === "APPROVED";
  const canCancel = concert.status === "PLANNING" || concert.status === "APPROVED";

  return (
    <div className="mb-6">
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-primary">{concert.name}</h1>
        {isCoordinator && (
          <div className="flex items-center gap-2">
            {canEdit && (
              <Button
                variant="outline"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="text-orange-600 hover:text-orange-700 border-orange-300 hover:border-orange-400"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

