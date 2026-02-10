import { Button } from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";
import { Trash2 } from "lucide-react";
import { useUser } from "~/shared/hooks/domain";
import type { TeamMemberResponse } from "~/api";
import { formatRole } from "~/shared/utils";
import { TeamMemberContactInfo } from "./TeamMemberContactInfo";

interface TeamMemberDetailCardProps {
  member: TeamMemberResponse;
  onDelete: () => void;
}

export function TeamMemberDetailCard({ member, onDelete }: TeamMemberDetailCardProps) {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";
  const isCurrentUser = member.id === user?.id;
  const initial = member.name?.charAt(0) || "?";

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-semibold text-blue-600">
              {initial}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">{member.name || "Unknown"}</h1>
              <p className="mt-1 text-lg text-text-secondary">{formatRole(member.role)}</p>
            </div>
          </div>
          {isCoordinator && !isCurrentUser && (
            <Button
              variant="outline"
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
        <TeamMemberContactInfo member={member} />
      </CardContent>
    </Card>
  );
}

