import { useState, useMemo, useEffect } from "react";
import { AuthGuard } from "~/components/AuthGuard";
import { TeamHeader } from "~/routes/_authenticated.team/components/TeamHeader";
import { TeamSearch } from "~/routes/_authenticated.team/components/TeamSearch";
import { TeamList } from "~/routes/_authenticated.team/components/TeamList";
import { InviteTeamMemberDialog } from "~/routes/_authenticated.team/components/InviteTeamMemberDialog";
import { DeleteTeamMemberDialog } from "~/routes/_authenticated.team/components/DeleteTeamMemberDialog";
import { TeamNotMemberMessage } from "~/routes/_authenticated.team/components/TeamNotMemberMessage";
import { useTeamMembers } from "~/hooks/useTeamMembers";
import { useTeamInvitations } from "~/hooks/useTeamInvitations";
import { useInviteTeamMember } from "~/hooks/useInviteTeamMember";
import { useRemoveTeamMember } from "~/hooks/useRemoveTeamMember";
import { useCancelTeamInvitation } from "~/hooks/useCancelTeamInvitation";
import { useCheckTeamMembership } from "~/hooks/useCheckTeamMembership";
import { useUser } from "~/hooks/useUser";
import type { TeamMemberResponse, TeamInvitationResponse } from "~/api";

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMemberResponse | null>(null);

  const { data: user, isLoading: isLoadingUser } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";
  const { data: teamMembers = [], isLoading: isLoadingMembers } = useTeamMembers();
  const { data: pendingInvitations = [], isLoading: isLoadingInvitations } = useTeamInvitations();
  const { data: isTeamMember = false, isLoading: isLoadingMembership } = useCheckTeamMembership();
  const inviteMutation = useInviteTeamMember();
  const removeMutation = useRemoveTeamMember();
  const cancelInvitationMutation = useCancelTeamInvitation();

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return teamMembers;
    return teamMembers.filter(
      (member) =>
        member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teamMembers, searchQuery]);

  useEffect(() => {
    if (inviteMutation.isSuccess) {
      setIsInviteDialogOpen(false);
      inviteMutation.reset();
    }
  }, [inviteMutation.isSuccess, inviteMutation]);

  useEffect(() => {
    if (!isInviteDialogOpen) {
      inviteMutation.reset();
    }
  }, [isInviteDialogOpen, inviteMutation]);

  const handleInviteMember = async (email: string) => {
    try {
      await inviteMutation.mutateAsync({ email });
      setIsInviteDialogOpen(false);
    } catch (error) {
      // Error will be handled by displaying appropriate info in the dialog
      console.error("Failed to invite team member:", error);
    }
  };

  if (isLoadingUser) {
    return (
      <AuthGuard>
        <div className="p-8 min-h-screen bg-bg-secondary">
          <div className="h-64 animate-pulse rounded-xl bg-bg-card border border-border-light" />
        </div>
      </AuthGuard>
    );
  }

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

  const handleCancelInvitation = async (invitation: TeamInvitationResponse) => {
    if (invitation.id) {
      try {
        await cancelInvitationMutation.mutateAsync(invitation.id);
      } catch (error) {
        console.error("Failed to cancel invitation:", error);
      }
    }
  };

  if (isCoordinator) {
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
            onCancelInvitation={handleCancelInvitation}
            isCancellingInvitation={cancelInvitationMutation.isPending}
            isLoading={isLoadingMembers || isLoadingInvitations}
          />
        </div>

        <InviteTeamMemberDialog
          isOpen={isInviteDialogOpen}
          onOpenChange={setIsInviteDialogOpen}
          onInvite={handleInviteMember}
          isInviting={inviteMutation.isPending}
          teamMembers={teamMembers}
          pendingInvitations={pendingInvitations}
          inviteError={inviteMutation.error}
          onClearError={() => inviteMutation.reset()}
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

  if (isLoadingMembership) {
    return (
      <AuthGuard>
        <div className="p-8 min-h-screen bg-bg-secondary">
          <div className="h-64 animate-pulse rounded-xl bg-bg-card border border-border-light" />
        </div>
      </AuthGuard>
    );
  }

  if (!isTeamMember) {
    return (
      <AuthGuard>
        <div className="p-8 min-h-screen bg-bg-secondary">
          <TeamNotMemberMessage />
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen bg-bg-secondary">
        <TeamHeader onInviteMember={() => setIsInviteDialogOpen(true)} />
        <TeamSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TeamList
          members={filteredMembers}
          pendingInvitations={[]}
          searchQuery={searchQuery}
          onDeleteMember={handleDeleteMember}
          isLoading={isLoadingMembers}
        />
      </div>
    </AuthGuard>
  );
}

