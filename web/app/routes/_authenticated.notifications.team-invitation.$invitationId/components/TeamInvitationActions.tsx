import { Button } from "~/components/ui/Button";
import { Check, X } from "lucide-react";

interface TeamInvitationActionsProps {
  onAccept: () => void;
  onReject: () => void;
  isProcessing: boolean;
}

export function TeamInvitationActions({
  onAccept,
  onReject,
  isProcessing,
}: TeamInvitationActionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button
          onClick={onAccept}
          disabled={isProcessing}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Check className="mr-2 h-4 w-4" />
          {isProcessing ? "Processing..." : "Accept Invitation"}
        </Button>
        <Button
          onClick={onReject}
          disabled={isProcessing}
          variant="outline"
          className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
        >
          <X className="mr-2 h-4 w-4" />
          {isProcessing ? "Processing..." : "Reject Invitation"}
        </Button>
      </div>
    </div>
  );
}

