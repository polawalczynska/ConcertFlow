import type { ConcertResponse } from "~/api";
import { formatDate } from "../../table/concertsTableUtils";
import { Label } from "~/components/ui/Label";

interface ConcertDetailsProps {
  concert: ConcertResponse;
}

export function ConcertDetails({ concert }: ConcertDetailsProps) {
  return (
    <>
      <div>
        <Label className="text-sm font-medium text-text-secondary">Date & Time</Label>
        <p className="mt-1 text-base text-text-primary">{formatDate(concert.date)}</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-text-secondary">Venue</Label>
        <p className="mt-1 text-base text-text-primary">{concert.venue}</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-text-secondary">City</Label>
        <p className="mt-1 text-base text-text-primary">{concert.city || "N/A"}</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-text-secondary">Budget</Label>
        <p className="mt-1 text-base text-text-primary">${concert.budget?.toLocaleString() || "0"}</p>
      </div>

      {concert.coordinatorName && (
        <div>
          <Label className="text-sm font-medium text-text-secondary">Coordinator</Label>
          <p className="mt-1 text-base text-text-primary">{concert.coordinatorName}</p>
        </div>
      )}

      {concert.budgetManagerName && (
        <div>
          <Label className="text-sm font-medium text-text-secondary">Budget Manager</Label>
          <p className="mt-1 text-base text-text-primary">{concert.budgetManagerName}</p>
        </div>
      )}

      {concert.technicalManagerName && (
        <div>
          <Label className="text-sm font-medium text-text-secondary">Technical Manager</Label>
          <p className="mt-1 text-base text-text-primary">{concert.technicalManagerName}</p>
        </div>
      )}
    </>
  );
}

