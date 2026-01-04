import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { ErrorPage } from "~/components/ErrorPage";

export async function loader({ request }: LoaderFunctionArgs) {
  throw json({ message: "Page not found" }, { status: 404 });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <ErrorPage
        statusCode={404}
        title="Page Not Found"
        message="The page you're looking for doesn't exist or has been moved."
        showHomeButton={true}
        showBackButton={true}
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

