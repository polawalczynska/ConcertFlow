import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import type { TeamInvitation } from "../types";

export function useTeamInvitation(initialInvitation: TeamInvitation) {
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<TeamInvitation>(initialInvitation);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setInvitation({ ...invitation, status: "accepted" });
      setIsProcessing(false);
      setTimeout(() => {
        navigate("/team/");
      }, 1000);
    }, 500);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setInvitation({ ...invitation, status: "rejected" });
      setIsProcessing(false);
      setTimeout(() => {
        navigate("/notifications/");
      }, 1000);
    }, 500);
  };

  return {
    invitation,
    isProcessing,
    handleAccept,
    handleReject,
  };
}

