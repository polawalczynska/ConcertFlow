import { useNavigate } from "@remix-run/react";
import { useTeamInvitation as useTeamInvitationQuery, useAcceptTeamInvitation, useRejectTeamInvitation } from "~/features/team/hooks";
import { ONE_SECOND_MS } from "~/shared/constants";

export function useTeamInvitation(invitationId: number | null) {
  const navigate = useNavigate();
  const { data: invitation, isLoading } = useTeamInvitationQuery(invitationId);
  const acceptMutation = useAcceptTeamInvitation();
  const rejectMutation = useRejectTeamInvitation();

  const handleAccept = async () => {
    if (invitationId) {
      try {
        await acceptMutation.mutateAsync(invitationId);
        setTimeout(() => {
          navigate("/team/");
        }, ONE_SECOND_MS);
      } catch (error) {
        console.error("Failed to accept invitation:", error);
      }
    }
  };

  const handleReject = async () => {
    if (invitationId) {
      try {
        await rejectMutation.mutateAsync(invitationId);
        setTimeout(() => {
          navigate("/notifications/");
        }, ONE_SECOND_MS);
      } catch (error) {
        console.error("Failed to reject invitation:", error);
      }
    }
  };

  return {
    invitation: invitation || null,
    isLoading,
    isProcessing: acceptMutation.isPending || rejectMutation.isPending,
    handleAccept,
    handleReject,
  };
}

