import { useState, useMemo } from "react";
import { AuthGuard } from "~/components/AuthGuard";
import { TeamHeader } from "~/routes/_authenticated.team/components/TeamHeader";
import { TeamSearch } from "~/routes/_authenticated.team/components/TeamSearch";
import { TeamList } from "~/routes/_authenticated.team/components/TeamList";
import { InviteTeamMemberDialog } from "~/routes/_authenticated.team/components/InviteTeamMemberDialog";
import { DeleteTeamMemberDialog } from "~/routes/_authenticated.team/components/DeleteTeamMemberDialog";
import { useTeamMembers } from "~/hooks/useTeamMembers";
import { useTeamInvitations } from "~/hooks/useTeamInvitations";
import { useInviteTeamMember } from "~/hooks/useInviteTeamMember";
import { useRemoveTeamMember } from "~/hooks/useRemoveTeamMember";
import type { TeamMemberResponse, TeamInvitationResponse } from "~/api";

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMemberResponse | null>(null);

  const { data: teamMembers = [], isLoading: isLoadingMembers } = useTeamMembers();
  const { data: pendingInvitations = [], isLoading: isLoadingInvitations } = useTeamInvitations();
  const inviteMutation = useInviteTeamMember();
  const removeMutation = useRemoveTeamMember();

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return teamMembers;
    return teamMembers.filter(
      (member) =>
        member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teamMembers, searchQuery]);

  const handleInviteMember = async (email: string) => {
    try {
      await inviteMutation.mutateAsync({ email });
      setIsInviteDialogOpen(false);
    } catch (error) {
      console.error("Failed to invite team member:", error);
    }
  };

  const handleDeleteMember = (member: TeamMemberResponse) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMember?.id) {
      try {
        await removeMutation.mutateAsync(selectedMember.id);
        setIsDeleteDialogOpen(false);
        setSelectedMember(null);
      } catch (error) {
        console.error("Failed to remove team member:", error);
      }
    }
  };

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen bg-bg-secondary">
        <TeamHeader onInviteMember={() => setIsInviteDialogOpen(true)} />
        <TeamSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TeamList
          members={filteredMembers}
          pendingInvitations={pendingInvitations}
          searchQuery={searchQuery}
          onDeleteMember={handleDeleteMember}
          isLoading={isLoadingMembers || isLoadingInvitations}
        />
      </div>

      <InviteTeamMemberDialog
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onInvite={handleInviteMember}
      />

      <DeleteTeamMemberDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        member={selectedMember}
        isDeleting={removeMutation.isPending}
        onConfirm={confirmDelete}
      />
    </AuthGuard>
  );
}

