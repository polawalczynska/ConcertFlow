import type { ConcertResponse } from "~/api";
import { Button } from "~/components/ui/Button";
import { Edit, Trash2, Eye, X } from "lucide-react";

interface ConcertActionsProps {
  concert: ConcertResponse;
  onView: (concert: ConcertResponse) => void;
  onEdit: (concert: ConcertResponse) => void;
  onDelete: (concert: ConcertResponse) => void;
  onCancel: (concert: ConcertResponse) => void;
}

export function ConcertActions({ concert, onView, onEdit, onDelete, onCancel }: ConcertActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" onClick={() => onView(concert)}>
        <Eye className="h-4 w-4" />
      </Button>
      {(concert.status === "PLANNING" || concert.status === "APPROVED") && (
        <>
          <Button variant="ghost" size="sm" onClick={() => onEdit(concert)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(concert)}
            className="text-orange-600 hover:text-orange-700"
            title="Cancel concert"
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
      {(concert.status === "PLANNING" || concert.status === "CANCELLED") && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(concert)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

