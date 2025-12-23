import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import type { ConcertResponse } from "~/api";
import { ConcertHeader } from "./view/ConcertHeader";
import { ConcertDetails } from "./view/ConcertDetails";
import { ConcertDescription } from "./view/ConcertDescription";
import { CancellationReason } from "./view/CancellationReason";

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
            <ConcertHeader concert={concert} />
            <ConcertDetails concert={concert} />
            <ConcertDescription concert={concert} />
            <CancellationReason concert={concert} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

