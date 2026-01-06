import { CardHeader, CardTitle } from "~/components/ui/Card";
import { AlertCircle } from "lucide-react";

export function TechnicalRevisionNotesHeader() {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg text-orange-900">
        <AlertCircle className="h-5 w-5" />
        Revision Request Details
      </CardTitle>
    </CardHeader>
  );
}

