import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/Button";
import type { TechnicalApproval } from "../../data/mockTechnicalApprovals";

interface TechnicalActionButtonsProps {
  approval: TechnicalApproval;
  onApprove: () => void;
  onRequestRevision: () => void;
}

export function TechnicalActionButtons({
  approval,
  onApprove,
  onRequestRevision,
}: TechnicalActionButtonsProps) {
  if (approval.status === "APPROVED") {
    return null;
  }

  return (
    <div className="mt-6 flex gap-3">
      <Button onClick={onApprove} className="flex-1 bg-purple-main hover:bg-purple-main/90">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Approve Technically
      </Button>
      <Button onClick={onRequestRevision} variant="outline" className="flex-1">
        <AlertCircle className="mr-2 h-4 w-4" />
        Request Revision
      </Button>
    </div>
  );
}

