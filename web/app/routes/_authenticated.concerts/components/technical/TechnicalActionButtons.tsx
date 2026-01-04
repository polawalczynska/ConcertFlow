import { Button } from "~/components/ui/Button";
import { CheckCircle, XCircle } from "lucide-react";

interface TechnicalActionButtonsProps {
  onApprove: () => void;
  onRequestRevision?: () => void;
  isLoading?: boolean;
}

export function TechnicalActionButtons({
  onApprove,
  onRequestRevision,
  isLoading = false,
}: TechnicalActionButtonsProps) {
  return (
    <div className="flex gap-3 mt-4">
      <Button
        onClick={onApprove}
        disabled={isLoading}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Approve
      </Button>
      {onRequestRevision && (
        <Button
          onClick={onRequestRevision}
          disabled={isLoading}
          variant="outline"
          className="flex-1 text-orange-600 border-orange-300 hover:bg-orange-50"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Request Revision
        </Button>
      )}
    </div>
  );
}

