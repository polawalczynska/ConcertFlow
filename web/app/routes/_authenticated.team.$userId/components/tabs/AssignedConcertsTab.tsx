import { Card, CardContent } from "~/components/ui/Card";
import { AssignedConcertsTabHeader } from "./assigned-concerts/AssignedConcertsTabHeader";
import { AssignedConcertsEmptyState } from "./assigned-concerts/AssignedConcertsEmptyState";
import { AssignedConcertItem } from "./assigned-concerts/AssignedConcertItem";
import type { AssignedConcert } from "../../types";

interface AssignedConcertsTabProps {
  concerts: AssignedConcert[];
}

export function AssignedConcertsTab({ concerts }: AssignedConcertsTabProps) {
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

