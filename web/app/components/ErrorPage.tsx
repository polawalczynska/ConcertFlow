import { ErrorPageContainer } from "./error/ErrorPageContainer";
import { ErrorCodeDisplay } from "./error/ErrorCodeDisplay";
import { ErrorContent } from "./error/ErrorContent";
import { ErrorActions } from "./error/ErrorActions";

interface ErrorPageProps {
  statusCode: number;
  title: string;
  message: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export function ErrorPage({
  statusCode,
  title,
  message,
  showHomeButton = true,
  showBackButton = true,
}: ErrorPageProps) {
  return (
    <ErrorPageContainer>
      <ErrorCodeDisplay statusCode={statusCode} />
      <ErrorContent title={title} message={message} />
      <ErrorActions showHomeButton={showHomeButton} showBackButton={showBackButton} />
    </ErrorPageContainer>
  );
}

