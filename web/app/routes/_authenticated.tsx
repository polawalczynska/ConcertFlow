import { Outlet } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";
import { AuthGuard } from "~/components/AuthGuard";

export default function AuthenticatedLayout() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-bg-secondary">
        <Navbar />
        <Outlet />
      </div>
    </AuthGuard>
  );
}

