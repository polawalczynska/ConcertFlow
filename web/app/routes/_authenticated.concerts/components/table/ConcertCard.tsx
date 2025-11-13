import type { ConcertResponse } from "~/api";
import { formatDate } from "./concertsTableUtils";
import { ConcertStatusBadge } from "./ConcertStatusBadge";
import { ConcertActions } from "./ConcertActions";

interface ConcertCardProps {
  concert: ConcertResponse;
  onEdit: (concert: ConcertResponse) => void;
  onDelete: (concert: ConcertResponse) => void;
  onView: (concert: ConcertResponse) => void;
}

export function ConcertCard({ concert, onEdit, onDelete, onView }: ConcertCardProps) {
  return (
    <div className="p-4 hover:bg-bg-secondary">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary break-words mb-1">
            {concert.name}
          </h3>
          <p className="text-sm text-text-secondary">
            {concert.artistName || "N/A"}
          </p>
        </div>
        <ConcertStatusBadge status={concert.status} className="ml-2 flex-shrink-0" />
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Date:</span>
          <span className="text-text-primary font-medium">{formatDate(concert.date)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Venue:</span>
          <span className="text-text-primary font-medium break-words text-right">{concert.venue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Budget:</span>
          <span className="text-text-primary font-medium">${concert.budget?.toLocaleString() || "0"}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border-light">
        <ConcertActions
          concert={concert}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

