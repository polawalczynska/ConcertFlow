import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";
import { useUser } from "~/hooks/useUser";

interface TeamHeaderProps {
  onInviteMember: () => void;
}

export function TeamHeader({ onInviteMember }: TeamHeaderProps) {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";
  const isManager = user?.role === "BUDGET_MANAGER" || user?.role === "TECHNICAL_MANAGER";

  const subtitle = isCoordinator
    ? "Manage your concert production team members"
    : isManager
    ? "View your team information and assigned concerts"
    : "Team Management";

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Team Management</h1>
        <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
      </div>
      {isCoordinator && (
        <Button onClick={onInviteMember} className="bg-purple-main hover:bg-purple-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      )}
    </div>
  );
}

