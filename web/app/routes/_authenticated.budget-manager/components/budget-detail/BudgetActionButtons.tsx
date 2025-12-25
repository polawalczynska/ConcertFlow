import { Button } from "~/components/ui/Button";
import { Check, AlertCircle } from "lucide-react";

interface BudgetActionButtonsProps {
  onApprove: () => void;
  onRequestRevision: () => void;
}

export function BudgetActionButtons({
  onApprove,
  onRequestRevision,
}: BudgetActionButtonsProps) {
  return (
    <div className="flex gap-3">
      <Button onClick={onApprove} className="flex-1 bg-purple-main hover:bg-purple-main/90">
        <Check className="mr-2 h-4 w-4" />
        Approve Budget
      </Button>
      <Button onClick={onRequestRevision} variant="outline" className="flex-1">
        <AlertCircle className="mr-2 h-4 w-4" />
        Request Revision
      </Button>
    </div>
  );
}

