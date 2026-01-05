import type { ConcertResponse } from "~/api";
import { ConcertsTableHeader } from "./table/ConcertsTableHeader";
import { ConcertsTableRow } from "./table/ConcertsTableRow";
import { ConcertCard } from "./table/ConcertCard";

interface ConcertsTableProps {
  concerts: ConcertResponse[];
  onEdit: (concert: ConcertResponse) => void;
  onDelete: (concert: ConcertResponse) => void;
  onView: (concert: ConcertResponse) => void;
  onCancel: (concert: ConcertResponse) => void;
}

export function ConcertsTable({ concerts, onEdit, onDelete, onView, onCancel }: ConcertsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border-light bg-bg-main">
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full">
          <ConcertsTableHeader />
          <tbody className="divide-y divide-border-light bg-bg-main">
            {concerts.map((concert) => (
              <ConcertsTableRow
                key={concert.id}
                concert={concert}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                onCancel={onCancel}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-border-light">
        {concerts.map((concert) => (
          <ConcertCard
            key={concert.id}
            concert={concert}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            onCancel={onCancel}
          />
        ))}
      </div>
    </div>
  );
}

