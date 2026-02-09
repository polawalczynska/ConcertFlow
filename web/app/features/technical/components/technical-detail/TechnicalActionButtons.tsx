import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Button } from "~/components/ui/Button";
import type { TechnicalApproval } from "../../types/TechnicalApproval";

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
  const isApproved = approval.status === "APPROVED";
  const isRevisionRequested = approval.status === "REVISION_REQUESTED";
  const isSubmitted = approval.status === "SUBMITTED";

  if (isApproved) {
    return null;
  }

  if (isRevisionRequested) {
    return (
      <div className="mt-6 space-y-3">
        <Button onClick={onApprove} className="w-full bg-blue-main hover:bg-blue-main/90">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Approve Technically
        </Button>
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <p className="text-sm font-medium text-amber-900">
            Revision requested - awaiting coordinator response
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="mt-6 flex gap-3">
        <Button onClick={onApprove} className="flex-1 bg-blue-main hover:bg-blue-main/90">
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

  return null;
}

