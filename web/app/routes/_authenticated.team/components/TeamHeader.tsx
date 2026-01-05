import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";
import { useUser } from "~/shared/hooks/domain";

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
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Team Management</h1>
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        </div>
        {isCoordinator && (
          <Button 
            onClick={onInviteMember} 
            className="bg-purple-main hover:bg-purple-dark w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        )}
      </div>
    </div>
  );
}

