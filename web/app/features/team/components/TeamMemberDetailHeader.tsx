import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export function TeamMemberDetailHeader() {
  return (
    <div className="mb-8">
      <Link to="/team/">
        <Button variant="outline" className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Team
        </Button>
      </Link>
    </div>
  );
}

