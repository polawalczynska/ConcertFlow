import {
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectItem,
  SearchableSelectTrigger,
} from "~/components/ui/SearchableSelect";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface TechnicalManagerSelectFieldProps {
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  error?: string;
  technicalManagers: Array<{ id?: number; firstName?: string; lastName?: string }>;
}

export function TechnicalManagerSelectField({
  value,
  onChange,
  error,
  technicalManagers,
}: TechnicalManagerSelectFieldProps) {
  const selectedManager = technicalManagers.find((manager) => manager.id === value);
  const displayName = selectedManager
    ? `${selectedManager.firstName || ""} ${selectedManager.lastName || ""}`.trim()
    : "Select a technical manager (optional)";

  return (
    <FormFieldWrapper label="Technical Manager" error={error} htmlFor="technicalManagerId">
      <SearchableSelect
        value={value ? String(value) : ""}
        onValueChange={(val) => onChange(val ? Number.parseInt(val) : null)}
      >
        <SearchableSelectTrigger
          className={error ? "border-red-500" : ""}
          id="technicalManagerId"
        >
          {displayName}
        </SearchableSelectTrigger>
        <SearchableSelectContent searchPlaceholder="Search technical manager...">
          <SearchableSelectItem value="" filterText="None">
            None
          </SearchableSelectItem>
          {technicalManagers.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-text-secondary">
              No technical managers available
            </div>
          ) : (
            technicalManagers.map((manager) => {
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

