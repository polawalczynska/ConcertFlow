import { Dialog, DialogContent } from "~/components/ui/Dialog";
import { InviteDialogHeader } from "./invite-dialog/InviteDialogHeader";
import { EmailSearchField } from "./invite-dialog/EmailSearchField";
import { SearchStatus } from "./invite-dialog/SearchStatus";
import { UserSearchResult } from "./invite-dialog/UserSearchResult";
import { InviteDialogFooter } from "./invite-dialog/InviteDialogFooter";
import { useUserSearch } from "./invite-dialog/hooks/useUserSearch";

interface InviteTeamMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (email: string) => void;
}

export function InviteTeamMemberDialog({
  isOpen,
  onOpenChange,
  onInvite,
}: InviteTeamMemberDialogProps) {
  const { email, setEmail, isSearching, foundUser, error, searchUser, reset } = useUserSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && foundUser) {
      onInvite(email);
      reset();
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
            {foundUser && !isSearching && <UserSearchResult user={foundUser} />}
          </div>
          <InviteDialogFooter
            onCancel={handleClose}
            isDisabled={!email || !foundUser || isSearching}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

