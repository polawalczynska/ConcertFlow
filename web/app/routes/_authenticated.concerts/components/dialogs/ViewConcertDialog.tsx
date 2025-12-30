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
import { BudgetManagement } from "../budget/BudgetManagement";
import { TechnicalManagement } from "../technical/TechnicalManagement";
import { useUser } from "~/hooks/useUser";
import { UserResponseRoleEnum } from "~/api";

interface ViewConcertDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concert: ConcertResponse | null;
  onSubmitBudget?: () => void;
}

export function ViewConcertDialog({ isOpen, onOpenChange, concert }: ViewConcertDialogProps) {
  const { data: currentUser } = useUser();
  
  if (!concert) return null;

  const isCoordinator = currentUser?.role === UserResponseRoleEnum.Coordinator;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[900px] w-[90vw] max-h-[90vh] overflow-y-auto">
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

          {isCoordinator && concert.id && (
            <>
              <BudgetManagement concertId={concert.id} />
              <TechnicalManagement concertId={concert.id} />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

