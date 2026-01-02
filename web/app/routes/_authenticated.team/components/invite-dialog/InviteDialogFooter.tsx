import { DialogFooter } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";

interface InviteDialogFooterProps {
  onCancel: () => void;
  isDisabled: boolean;
}

export function InviteDialogFooter({ onCancel, isDisabled }: InviteDialogFooterProps) {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="bg-purple-main hover:bg-purple-dark" 
        disabled={isDisabled}
      >
        Send Invitation
      </Button>
    </DialogFooter>
  );
}

