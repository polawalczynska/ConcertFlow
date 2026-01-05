import { DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/Dialog";

export function InviteDialogHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Invite Team Member</DialogTitle>
      <DialogDescription>
        Search for a user by email. They will receive a notification in the app to join your team.
      </DialogDescription>
    </DialogHeader>
  );
}

