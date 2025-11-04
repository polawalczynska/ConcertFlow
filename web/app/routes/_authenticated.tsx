import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";
import { useTokenRefresh } from "~/hooks/useTokenRefresh";

export async function loader({ request }: LoaderFunctionArgs) {
  return {
    userRole: "coordinator" as const,
    userName: "Anna Kowalska",
    userEmail: "anna.kowalska@concerts.pl",
  };
}

export default function AuthenticatedLayout() {
  useTokenRefresh();

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Navbar />
      <Outlet />
    </div>
  );
}

