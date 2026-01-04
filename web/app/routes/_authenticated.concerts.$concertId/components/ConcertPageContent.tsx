import type { ConcertResponse } from "~/api";
import { ConcertHeader } from "~/routes/_authenticated.concerts/components/dialogs/view/ConcertHeader";
import { ConcertDetails } from "~/routes/_authenticated.concerts/components/dialogs/view/ConcertDetails";
import { ConcertDescription } from "~/routes/_authenticated.concerts/components/dialogs/view/ConcertDescription";
import { CancellationReason } from "~/routes/_authenticated.concerts/components/dialogs/view/CancellationReason";

interface ConcertPageContentProps {
  concert: ConcertResponse;
}

export function ConcertPageContent({ concert }: ConcertPageContentProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ConcertHeader concert={concert} />
      <ConcertDetails concert={concert} />
      <ConcertDescription concert={concert} />
      <CancellationReason concert={concert} />
    </div>
  );
}

