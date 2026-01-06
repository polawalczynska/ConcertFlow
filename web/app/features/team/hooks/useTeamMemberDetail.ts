import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import type { TeamMemberResponse } from "~/api";
import type { UseMutationResult } from "@tanstack/react-query";

interface UseTeamMemberDetailReturn {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
  confirmDelete: () => Promise<void>;
}

export function useTeamMemberDetail(
  member: TeamMemberResponse | undefined,
  removeMutation: UseMutationResult<void, Error, number>
): UseTeamMemberDetailReturn {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (member?.id) {
      try {
        await removeMutation.mutateAsync(member.id);
        setIsDeleteDialogOpen(false);
        navigate("/team/");
      } catch (error) {
        console.error("Failed to remove team member:", error);
      }
    }
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete,
    confirmDelete,
  };
}

