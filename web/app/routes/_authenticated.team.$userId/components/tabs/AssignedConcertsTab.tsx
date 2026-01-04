import { Card, CardContent } from "~/components/ui/Card";
import { AssignedConcertsTabHeader } from "./assigned-concerts/AssignedConcertsTabHeader";
import { AssignedConcertsEmptyState } from "./assigned-concerts/AssignedConcertsEmptyState";
import { AssignedConcertItem } from "./assigned-concerts/AssignedConcertItem";
import { useAssignedConcerts } from "~/hooks/useAssignedConcerts";
import type { ConcertResponse } from "~/api";

interface AssignedConcertsTabProps {
  memberId: number | null;
}

function mapConcertToAssignedConcert(concert: ConcertResponse) {
  const now = new Date();
  const concertDate = concert.date ? new Date(concert.date) : null;
  const isCompleted = concertDate ? concertDate < now : false;
  
  return {
    id: concert.id || 0,
    name: concert.name || "Unknown",
    date: concert.date || new Date().toISOString(),
    venue: concert.venue || "Unknown",
    status: isCompleted ? ("completed" as const) : ("upcoming" as const),
    concertStatus: concert.status,
  };
}

export function AssignedConcertsTab({ memberId }: AssignedConcertsTabProps) {
  const { data: concerts = [], isLoading } = useAssignedConcerts(memberId);

  const assignedConcerts = concerts
    .map(mapConcertToAssignedConcert)
    .sort((a, b) => {
      const aIsActive = a.concertStatus === "PLANNING" || a.concertStatus === "APPROVED";
      const bIsActive = b.concertStatus === "PLANNING" || b.concertStatus === "APPROVED";
      
      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;
      
      if (aIsActive && bIsActive) {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      }
      
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate;
    });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <AssignedConcertsTabHeader />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-bg-secondary" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <AssignedConcertsTabHeader />
        {assignedConcerts.length === 0 ? (
          <AssignedConcertsEmptyState />
        ) : (
          <div className="space-y-3">
            {assignedConcerts.map((concert) => (
              <AssignedConcertItem key={concert.id} concert={concert} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

