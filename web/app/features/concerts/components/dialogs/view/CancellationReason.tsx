import type { ConcertResponse } from "~/api";
import { Label } from "~/components/ui/Label";

interface CancellationReasonProps {
  concert: ConcertResponse;
}

export function CancellationReason({ concert }: CancellationReasonProps) {
  if (concert.status !== "CANCELLED" || !concert.cancellationReason) return null;

  return (
    <div className="sm:col-span-2">
      <Label className="text-sm font-medium text-text-secondary">Cancellation Reason</Label>
      <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded-md">
        <p className="text-base text-red-800 whitespace-pre-wrap break-words">
          {concert.cancellationReason}
        </p>
      </div>
    </div>
  );
}

