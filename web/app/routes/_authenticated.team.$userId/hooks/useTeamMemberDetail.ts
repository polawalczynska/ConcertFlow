import { useState } from "react";
import { useNavigate } from "@remix-run/react";

interface UseTeamMemberDetailReturn {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  isDeleting: boolean;
  handleDelete: () => void;
  confirmDelete: () => void;
}

export function useTeamMemberDetail(): UseTeamMemberDetailReturn {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      navigate("/team/");
    }, 500);
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting,
    handleDelete,
    confirmDelete,
  };
}

