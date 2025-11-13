import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import type { ConcertResponse } from "~/api";
import { ConcertStatusBadge } from "./table/ConcertStatusBadge";
import { formatDate } from "./table/concertsTableUtils";
import { Label } from "~/components/ui/Label";

interface ViewConcertDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concert: ConcertResponse | null;
}

export function ViewConcertDialog({ isOpen, onOpenChange, concert }: ViewConcertDialogProps) {
  if (!concert) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[700px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>Concert Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
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

            <div>
              <Label className="text-sm font-medium text-text-secondary">Date & Time</Label>
              <p className="mt-1 text-base text-text-primary">{formatDate(concert.date)}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-text-secondary">Venue</Label>
              <p className="mt-1 text-base text-text-primary">{concert.venue}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-text-secondary">Budget</Label>
              <p className="mt-1 text-base text-text-primary">${concert.budget?.toLocaleString() || "0"}</p>
            </div>

            {concert.description && (
              <div className="sm:col-span-2">
                <Label className="text-sm font-medium text-text-secondary">Description</Label>
                <p className="mt-1 text-base text-text-primary whitespace-pre-wrap">{concert.description}</p>
              </div>
            )}

            {concert.status === "CANCELLED" && concert.cancellationReason && (
              <div className="sm:col-span-2">
                <Label className="text-sm font-medium text-text-secondary">Cancellation Reason</Label>
                <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-base text-red-800 whitespace-pre-wrap break-words">
                    {concert.cancellationReason}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

