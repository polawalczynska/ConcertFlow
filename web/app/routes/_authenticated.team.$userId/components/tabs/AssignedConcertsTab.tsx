import { Card, CardContent } from "~/components/ui/Card";
import { AssignedConcertsTabHeader } from "./assigned-concerts/AssignedConcertsTabHeader";
import { AssignedConcertsEmptyState } from "./assigned-concerts/AssignedConcertsEmptyState";
import { AssignedConcertItem } from "./assigned-concerts/AssignedConcertItem";

interface AssignedConcertsTabProps {
  memberId: number | null;
}

export function AssignedConcertsTab({ memberId }: AssignedConcertsTabProps) {
  // TODO: Implement API call to fetch assigned concerts for this member
  // For now, show empty state
  const concerts: any[] = [];

  return (
    <Card>
      <CardContent className="p-6">
        <AssignedConcertsTabHeader />
        {concerts.length === 0 ? (
          <AssignedConcertsEmptyState />
        ) : (
          <div className="space-y-3">
            {concerts.map((concert) => (
              <AssignedConcertItem key={concert.id} concert={concert} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

