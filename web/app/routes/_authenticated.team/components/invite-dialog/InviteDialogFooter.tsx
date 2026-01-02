import { DialogFooter } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";

interface InviteDialogFooterProps {
  onCancel: () => void;
  isDisabled: boolean;
  isInviting?: boolean;
  showInviteButton?: boolean;
}

export function InviteDialogFooter({ 
  onCancel, 
  isDisabled, 
  isInviting = false,
  showInviteButton = true,
}: InviteDialogFooterProps) {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel} disabled={isInviting}>
        Cancel
      </Button>
      {showInviteButton && (
        <Button 
          type="submit" 
          className="bg-purple-main hover:bg-purple-dark" 
          disabled={isDisabled}
        >
          {isInviting ? "Sending..." : "Send Invitation"}
        </Button>
      )}
    </DialogFooter>
  );
}

