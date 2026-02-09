import { Link } from "@remix-run/react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/Button";

interface ErrorActionsProps {
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export function ErrorActions({
  showHomeButton = true,
  showBackButton = true,
}: ErrorActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {showBackButton && (
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      )}
      {showHomeButton && (
        <Link to="/">
          <Button className="flex items-center gap-2 bg-pink-main hover:bg-pink-main/90">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </Link>
      )}
    </div>
  );
}

