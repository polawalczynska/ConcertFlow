import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import type { ConcertResponse } from "~/api";
import { ConcertHeader } from "./view/ConcertHeader";
import { ConcertDetails } from "./view/ConcertDetails";
import { ConcertDescription } from "./view/ConcertDescription";
import { CancellationReason } from "./view/CancellationReason";
import { useUser } from "~/hooks/useUser";
import { UserResponseRoleEnum } from "~/api";

interface ViewConcertDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concert: ConcertResponse | null;
  onSubmitBudget?: () => void;
}

export function ViewConcertDialog({ isOpen, onOpenChange, concert, onSubmitBudget }: ViewConcertDialogProps) {
  const { data: currentUser } = useUser();
  
  if (!concert) return null;

  const canSubmitBudget = 
    currentUser?.role === UserResponseRoleEnum.Coordinator;
  
  const budgetStatus = (concert as ConcertResponse & { budgetStatus?: string }).budgetStatus;
  const shouldShowSubmitButton = 
    canSubmitBudget &&
    concert.status === "PLANNING" &&
    (budgetStatus === "PENDING" || budgetStatus === "REVISION_REQUESTED" || budgetStatus === undefined) &&
    concert.budgetManagerId != null;

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
        {shouldShowSubmitButton && (
          <DialogFooter>
            <Button
              onClick={onSubmitBudget}
              className="bg-purple-main hover:bg-purple-main/90"
            >
              Submit Budget for Approval
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

