import { Label } from "~/components/ui/Label";

interface BudgetItemCategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export function BudgetItemCategoryField({
  value,
  onChange,
  categories,
}: BudgetItemCategoryFieldProps) {
  return (
    <div>
      <Label htmlFor="category">Category *</Label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border border-border-light rounded-md bg-bg-main text-text-primary"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

