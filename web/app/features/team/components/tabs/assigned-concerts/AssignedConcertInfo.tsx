import { Calendar } from "lucide-react";
import type { AssignedConcert } from "../../../types";

interface AssignedConcertInfoProps {
  concert: AssignedConcert;
}

export function AssignedConcertInfo({ concert }: AssignedConcertInfoProps) {
  return (
    <div>
      <p className="font-semibold text-text-primary">{concert.name}</p>
      <div className="mt-1 flex items-center gap-4 text-sm text-text-secondary">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(concert.date).toLocaleDateString()}
        </span>
        <span>{concert.venue}</span>
      </div>
    </div>
  );
}

