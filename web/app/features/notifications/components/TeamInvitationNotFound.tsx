import { Link } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export function TeamInvitationNotFound() {
  return (
    <div className="p-8 min-h-screen bg-bg-secondary">
      <div className="mx-auto max-w-2xl">
        <Link to="/notifications/">
          <Button variant="outline" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Notifications
          </Button>
        </Link>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-text-secondary">Invitation not found.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

