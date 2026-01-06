import { CardHeader, CardTitle } from "~/components/ui/Card";
import { AlertCircle } from "lucide-react";

interface RevisionNotesHeaderProps {
  isRevisionRequested: boolean;
}

export function RevisionNotesHeader({ isRevisionRequested }: RevisionNotesHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg text-orange-900">
        <AlertCircle className="h-5 w-5" />
        {isRevisionRequested ? "Current Revision Request" : "Your Revision Request"}
      </CardTitle>
    </CardHeader>
  );
}

