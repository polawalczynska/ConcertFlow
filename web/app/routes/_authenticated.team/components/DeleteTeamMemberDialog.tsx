import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/AlertDialog";
import type { TeamMemberResponse } from "~/api";

interface DeleteTeamMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMemberResponse | null;
  isDeleting: boolean;
  onConfirm: () => void;
}

export function DeleteTeamMemberDialog({
  isOpen,
  onOpenChange,
  member,
  isDeleting,
  onConfirm,
}: DeleteTeamMemberDialogProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{member?.name || "this member"}</strong> from the team? This action cannot be undone.
            {member && (member.assignedConcerts || 0) > 0 && (
              <span className="block mt-2 text-orange-600">
                Warning: This member is assigned to {member.assignedConcerts} {(member.assignedConcerts || 0) === 1 ? "concert" : "concerts"}.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700" disabled={isDeleting}>
            {isDeleting ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

