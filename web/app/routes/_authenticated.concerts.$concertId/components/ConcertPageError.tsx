import { useNavigate } from "@remix-run/react";
import { AuthGuard } from "~/components/AuthGuard";
import { Button } from "~/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export function ConcertPageError() {
  const navigate = useNavigate();

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-text-secondary mb-4">Concert not found</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </AuthGuard>
  );
}

