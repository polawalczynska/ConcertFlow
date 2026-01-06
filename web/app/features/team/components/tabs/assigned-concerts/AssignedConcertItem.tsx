import { Link } from "@remix-run/react";
import { AssignedConcertInfo } from "./AssignedConcertInfo";
import { AssignedConcertStatusBadge } from "./AssignedConcertStatusBadge";
import type { AssignedConcert } from "../../../types";

interface AssignedConcertItemProps {
  concert: AssignedConcert;
}

export function AssignedConcertItem({ concert }: AssignedConcertItemProps) {
  return (
    <Link to={`/concerts/${concert.id}`}>
      <div className="flex items-center justify-between rounded-lg border border-border-light p-4 transition-colors hover:bg-bg-secondary">
        <AssignedConcertInfo concert={concert} />
        <AssignedConcertStatusBadge status={concert.status} />
      </div>
    </Link>
  );
}

