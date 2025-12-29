import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/Checkbox";

interface ApproveTechnicalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  isLoading?: boolean;
}

export function ApproveTechnicalDialog({
  isOpen,
  onOpenChange,
  concertName,
  isLoading,
}: ApproveTechnicalDialogProps) {
  const [certified, setCertified] = useState(false);

  const handleApprove = () => {
    console.log("Approving technical request", {
      certified,
    });
    onOpenChange(false);
  };

  const canApprove = certified;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Approve Technical Request</DialogTitle>
          <DialogDescription>Review and approve the technical requirements for {concertName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-bg-secondary">
            <Checkbox
              id="certification"
              checked={certified}
              onCheckedChange={setCertified}
            />
            <label htmlFor="certification" className="text-sm cursor-pointer">
              I certify that all technical requirements have been reviewed and meet safety standards
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-purple-main hover:bg-purple-main/90"
            disabled={!canApprove || isLoading}
          >
            {isLoading ? "Approving..." : "Approve Technically"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

