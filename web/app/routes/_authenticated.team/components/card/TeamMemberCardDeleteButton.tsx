import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { useUser } from "~/hooks/useUser";
import type { TeamMember } from "./types";

interface TeamMemberCardDeleteButtonProps {
  member: TeamMember;
  onDelete: (member: TeamMember) => void;
}

export function TeamMemberCardDeleteButton({ member, onDelete }: TeamMemberCardDeleteButtonProps) {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";

  if (!isCoordinator) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-text-secondary hover:text-red-600"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(member);
      }}
      title="Remove from team"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

