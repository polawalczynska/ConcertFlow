import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useUser } from "~/hooks/useUser";

export function useCoordinatorAccess() {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser();

  useEffect(() => {
    if (!userLoading && user) {
      if (user.role !== "COORDINATOR") {
        navigate("/concerts", { replace: true });
      }
    }
  }, [user, userLoading, navigate]);

  return {
    user,
    userLoading,
    isCoordinator: user?.role === "COORDINATOR",
  };
}

