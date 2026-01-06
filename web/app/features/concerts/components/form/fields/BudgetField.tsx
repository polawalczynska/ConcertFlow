import { useState, useEffect } from "react";
import { Input } from "~/components/ui/Input";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface BudgetFieldProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function BudgetField({ value, onChange, error }: BudgetFieldProps) {
  const [budgetString, setBudgetString] = useState<string>("");

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setBudgetString(value === 0 ? "" : String(value));
    }
  }, [value]);

  return (
    <FormFieldWrapper label="Budget" required error={error} htmlFor="budget">
      <Input
        id="budget"
        type="text"
        inputMode="decimal"
        value={budgetString}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
            setBudgetString(inputValue);
            if (inputValue === "") {
              onChange(0);
            } else {
              const numValue = parseFloat(inputValue);
              if (!isNaN(numValue) && isFinite(numValue)) {
                onChange(numValue);
              }
            }
          }
        }}
        onBlur={() => {
          if (budgetString === "") {
            onChange(0);
          } else {
            const numValue = parseFloat(budgetString);
            if (!isNaN(numValue) && isFinite(numValue)) {
              onChange(numValue);
              const parsedString = String(numValue);
              if (budgetString.includes(".") && !parsedString.includes(".")) {
                setBudgetString(budgetString);
              } else {
                setBudgetString(parsedString);
              }
            }
          }
        }}
        className={error ? "border-red-500" : ""}
        placeholder="0.00"
      />
    </FormFieldWrapper>
  );
}

