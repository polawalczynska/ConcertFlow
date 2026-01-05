import { useParams } from "@remix-run/react";
import { DeleteTeamMemberDialog } from "~/features/team/components/DeleteTeamMemberDialog";
import { TeamMemberDetailHeader } from "~/features/team/components/TeamMemberDetailHeader";
import { TeamMemberDetailCard } from "~/features/team/components/TeamMemberDetailCard";
import { TeamMemberNotFound } from "~/features/team/components/TeamMemberNotFound";
import { AssignedConcertsTab } from "~/features/team/components/tabs/AssignedConcertsTab";
import { useTeamMemberDetail } from "~/features/team/hooks/useTeamMemberDetail";
import { useTeamMember, useRemoveTeamMember } from "~/features/team/hooks";

export default function TeamMemberDetailPage() {
  const params = useParams();
  const userId = params.userId ? Number.parseInt(params.userId) : null;
  
  const { data: member, isLoading } = useTeamMember(userId);
  const removeMutation = useRemoveTeamMember();
  
  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete,
    confirmDelete,
  } = useTeamMemberDetail(member || undefined, removeMutation);

  if (isLoading) {
    return (
      <div className="p-8 min-h-screen bg-bg-secondary">
        <div className="mx-auto max-w-4xl">
          <div className="h-64 animate-pulse rounded-xl bg-bg-card border border-border-light" />
        </div>
      </div>
    );
  }

  if (!member) {
    return <TeamMemberNotFound />;
  }

  return (
    <div className="p-8 min-h-screen bg-bg-secondary">
      <div className="mx-auto max-w-4xl">
        <TeamMemberDetailHeader />

        <TeamMemberDetailCard member={member} onDelete={handleDelete} />

        <div className="mt-6">
          <AssignedConcertsTab memberId={userId} />
        </div>
      </div>

      <DeleteTeamMemberDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        member={member}
        isDeleting={removeMutation.isPending}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

