import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { isAuthenticated } from "~/lib/token-storage";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold text-text-primary">ConcertFlow</h1>
      <p className="mt-4 text-text-secondary">Concert Management System</p>
    </main>
  );
}
