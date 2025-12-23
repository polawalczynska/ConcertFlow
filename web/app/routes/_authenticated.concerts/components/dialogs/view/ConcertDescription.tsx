import type { ConcertResponse } from "~/api";
import { Label } from "~/components/ui/Label";

interface ConcertDescriptionProps {
  concert: ConcertResponse;
}

export function ConcertDescription({ concert }: ConcertDescriptionProps) {
  if (!concert.description) return null;

  return (
    <div className="sm:col-span-2">
      <Label className="text-sm font-medium text-text-secondary">Description</Label>
      <p className="mt-1 text-base text-text-primary whitespace-pre-wrap">{concert.description}</p>
    </div>
  );
}

