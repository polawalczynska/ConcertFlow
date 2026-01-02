import { useMemo, useEffect } from "react";
import { Dialog, DialogContent } from "~/components/ui/Dialog";
import { InviteDialogHeader } from "./invite-dialog/InviteDialogHeader";
import { EmailSearchField } from "./invite-dialog/EmailSearchField";
import { SearchStatus } from "./invite-dialog/SearchStatus";
import { UserSearchResult } from "./invite-dialog/UserSearchResult";
import { UserAlreadyOnTeam } from "./invite-dialog/UserAlreadyOnTeam";
import { UserOnAnotherTeam } from "./invite-dialog/UserOnAnotherTeam";
import { InviteDialogFooter } from "./invite-dialog/InviteDialogFooter";
import { useUserSearch } from "./invite-dialog/hooks/useUserSearch";
import { useCheckUserOnAnotherTeam } from "~/hooks/useCheckUserOnAnotherTeam";
import type { TeamMemberResponse, TeamInvitationResponse } from "~/api";

interface InviteTeamMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (email: string) => void;
  isInviting: boolean;
  teamMembers: TeamMemberResponse[];
  pendingInvitations: TeamInvitationResponse[];
  inviteError: unknown;
  onClearError: () => void;
}

export function InviteTeamMemberDialog({
  isOpen,
  onOpenChange,
  onInvite,
  isInviting,
  teamMembers,
  pendingInvitations,
  inviteError,
  onClearError,
}: InviteTeamMemberDialogProps) {
  const { email, setEmail, isSearching, foundUser, error, searchUser, reset } = useUserSearch();
  const { data: isUserOnAnotherTeam = false, isLoading: isCheckingAnotherTeam } = useCheckUserOnAnotherTeam(
    foundUser?.id
  );

  useEffect(() => {
    if (isSearching && inviteError) {
      onClearError();
    }
  }, [isSearching, inviteError, onClearError]);

  const isUserAlreadyOnTeam = useMemo(() => {
    if (!foundUser) return false;
    return teamMembers.some((member) => member.email === foundUser.email);
  }, [foundUser, teamMembers]);

  const hasPendingInvitation = useMemo(() => {
    if (!foundUser) return false;
    return pendingInvitations.some((invitation) => invitation.email === foundUser.email);
  }, [foundUser, pendingInvitations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && foundUser && !isUserAlreadyOnTeam && !hasPendingInvitation && !isUserOnAnotherTeam) {
      onInvite(email);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <InviteDialogHeader />
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <EmailSearchField
              email={email}
              onEmailChange={setEmail}
              onSearch={searchUser}
            />
            <SearchStatus
              isSearching={isSearching}
              error={error}
              foundUser={foundUser}
            />
            {foundUser && !isSearching && (
              <>
                {isUserAlreadyOnTeam ? (
                  <UserAlreadyOnTeam user={foundUser} />
                ) : isUserOnAnotherTeam ? (
                  <UserOnAnotherTeam user={foundUser} />
                ) : (
                  <UserSearchResult user={foundUser} />
                )}
              </>
            )}
          </div>
          <InviteDialogFooter
            onCancel={handleClose}
            isDisabled={!email || !foundUser || isSearching || isInviting || isCheckingAnotherTeam || isUserAlreadyOnTeam || hasPendingInvitation || isUserOnAnotherTeam}
            isInviting={isInviting}
            showInviteButton={!isUserAlreadyOnTeam && !hasPendingInvitation && !isUserOnAnotherTeam}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

