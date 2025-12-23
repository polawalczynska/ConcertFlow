import type { ConcertRequest } from "~/api";
import { ConcertNameField } from "./fields/ConcertNameField";
import { ArtistSelectField } from "./fields/ArtistSelectField";
import { DateTimeField } from "./fields/DateTimeField";
import { BudgetField } from "./fields/BudgetField";
import { VenueField } from "./fields/VenueField";
import { DescriptionField } from "./fields/DescriptionField";
import { BudgetManagerSelectField } from "./fields/BudgetManagerSelectField";

interface ConcertFormFieldsProps {
  formData: ConcertRequest;
  formErrors: Record<string, string>;
  onFieldChange: (field: keyof ConcertRequest, value: string | number | null) => void;
  artists: Array<{ id?: number; name?: string }>;
  budgetManagers: Array<{ id?: number; firstName?: string; lastName?: string }>;
}

export function ConcertFormFields({
  formData,
  formErrors,
  onFieldChange,
  artists,
  budgetManagers,
}: ConcertFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4 sm:grid-cols-3">
      <ConcertNameField
        value={formData.name}
        onChange={(value) => onFieldChange("name", value)}
        error={formErrors.name}
      />
      <ArtistSelectField
        value={formData.artistId}
        onChange={(value) => onFieldChange("artistId", value)}
        error={formErrors.artistId}
        artists={artists}
      />
      <DateTimeField
        value={formData.date}
        onChange={(value) => onFieldChange("date", value)}
        error={formErrors.date}
      />
      <BudgetField
        value={formData.budget}
        onChange={(value) => onFieldChange("budget", value)}
        error={formErrors.budget}
      />
      <VenueField
        value={formData.venue}
        onChange={(value) => onFieldChange("venue", value)}
        error={formErrors.venue}
      />
      <BudgetManagerSelectField
        value={formData.budgetManagerId}
        onChange={(value) => onFieldChange("budgetManagerId", value)}
        error={formErrors.budgetManagerId}
        budgetManagers={budgetManagers}
      />
      <DescriptionField
        value={formData.description || ""}
        onChange={(value) => onFieldChange("description", value)}
      />
    </div>
  );
}

