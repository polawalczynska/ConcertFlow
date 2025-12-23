import {
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectItem,
  SearchableSelectTrigger,
} from "~/components/ui/SearchableSelect";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface BudgetManagerSelectFieldProps {
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  error?: string;
  budgetManagers: Array<{ id?: number; firstName?: string; lastName?: string }>;
}

export function BudgetManagerSelectField({
  value,
  onChange,
  error,
  budgetManagers,
}: BudgetManagerSelectFieldProps) {
  const selectedManager = budgetManagers.find((manager) => manager.id === value);
  const displayName = selectedManager
    ? `${selectedManager.firstName || ""} ${selectedManager.lastName || ""}`.trim()
    : "Select a budget manager (optional)";

  return (
    <FormFieldWrapper label="Budget Manager" error={error} htmlFor="budgetManagerId">
      <SearchableSelect
        value={value ? String(value) : ""}
        onValueChange={(val) => onChange(val ? Number.parseInt(val) : null)}
      >
        <SearchableSelectTrigger
          className={error ? "border-red-500" : ""}
          id="budgetManagerId"
        >
          {displayName}
        </SearchableSelectTrigger>
        <SearchableSelectContent searchPlaceholder="Search budget manager...">
          <SearchableSelectItem value="" filterText="None">
            None
          </SearchableSelectItem>
          {budgetManagers.length === 0 ? (
            <SearchableSelectItem value="no-managers" filterText="No budget managers available" disabled>
              No budget managers available
            </SearchableSelectItem>
          ) : (
            budgetManagers.map((manager) => {
              const name = `${manager.firstName || ""} ${manager.lastName || ""}`.trim();
              return (
                <SearchableSelectItem
                  key={manager.id}
                  value={String(manager.id)}
                  filterText={name}
                >
                  {name || `Manager #${manager.id}`}
                </SearchableSelectItem>
              );
            })
          )}
        </SearchableSelectContent>
      </SearchableSelect>
    </FormFieldWrapper>
  );
}

