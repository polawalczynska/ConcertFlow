import type { ConcertResponse } from "~/api";
import { ConcertStatusBadge } from "../../table/ConcertStatusBadge";
import { Label } from "~/components/ui/Label";

interface ConcertHeaderProps {
  concert: ConcertResponse;
}

export function ConcertHeader({ concert }: ConcertHeaderProps) {
  return (
    <>
      <div className="sm:col-span-2">
        <Label className="text-sm font-medium text-text-secondary">Concert Name</Label>
        <p className="mt-1 text-base font-semibold text-text-primary">{concert.name}</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-text-secondary">Artist</Label>
        <p className="mt-1 text-base text-text-primary">{concert.artistName || "N/A"}</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-text-secondary">Status</Label>
        <div className="mt-1">
          <ConcertStatusBadge status={concert.status} />
        </div>
      </div>
    </>
  );
}

