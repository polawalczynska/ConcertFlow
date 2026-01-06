import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export function TeamInvitationHeader() {
  return (
    <Link to="/notifications/">
      <Button variant="outline" className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Notifications
      </Button>
    </Link>
  );
}

