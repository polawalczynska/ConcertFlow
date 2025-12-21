import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { isAuthenticated } from "~/lib/token-storage";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
