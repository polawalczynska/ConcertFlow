import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export function TeamMemberNotFound() {
  return (
    <div className="p-8 min-h-screen bg-bg-secondary">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-border-light bg-bg-card p-12 text-center">
          <p className="text-text-secondary">Team member not found.</p>
          <Link to="/team/">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

