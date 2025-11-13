import type { ConcertResponse } from "~/api";
import { formatDate } from "./concertsTableUtils";
import { ConcertStatusBadge } from "./ConcertStatusBadge";
import { ConcertActions } from "./ConcertActions";

interface ConcertsTableRowProps {
  concert: ConcertResponse;
  onEdit: (concert: ConcertResponse) => void;
  onDelete: (concert: ConcertResponse) => void;
  onView: (concert: ConcertResponse) => void;
}

export function ConcertsTableRow({ concert, onEdit, onDelete, onView }: ConcertsTableRowProps) {
  return (
    <tr className="hover:bg-bg-secondary">
      <td className="px-4 py-4">
        <div className="font-medium text-text-primary break-words">
          {concert.name}
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary break-words">
        {concert.artistName || "N/A"}
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary break-words">
        {formatDate(concert.date)}
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary break-words">
        {concert.venue}
      </td>
      <td className="px-4 py-4">
        <ConcertStatusBadge status={concert.status} />
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">
        ${concert.budget?.toLocaleString() || "0"}
      </td>
      <td className="px-4 py-4 text-right text-sm">
        <ConcertActions
          concert={concert}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

