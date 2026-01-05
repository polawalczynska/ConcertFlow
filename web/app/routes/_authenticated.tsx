import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { Navbar } from "~/components/navbar";
import { AuthGuard } from "~/features/auth/components";
import { ErrorPage } from "~/components/ErrorPage";

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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 403) {
    return (
      <ErrorPage
        statusCode={403}
        title="Access Denied"
        message="You don't have permission to access this resource."
        showHomeButton={true}
        showBackButton={true}
      />
    );
  }

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <ErrorPage
        statusCode={401}
        title="Unauthorized"
        message="You need to be logged in to access this page."
        showHomeButton={true}
        showBackButton={false}
      />
    );
  }

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage
        statusCode={error.status}
        title="Something went wrong"
        message={error.statusText || "An unexpected error occurred."}
        showHomeButton={true}
        showBackButton={true}
      />
    );
  }

  return (
    <ErrorPage
      statusCode={500}
      title="Internal Server Error"
      message="An unexpected error occurred. Please try again later."
      showHomeButton={true}
      showBackButton={true}
    />
  );
}

