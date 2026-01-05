import React from "react";

interface RoleSelectProps {
  value: "" | "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const roleOptions = [
  { value: "", label: "Select a role" },
  { value: "COORDINATOR", label: "Coordinator" },
  { value: "BUDGET_MANAGER", label: "Budget Manager" },
  { value: "TECHNICAL_MANAGER", label: "Technical Manager" },
];

export default function RoleSelect({ value, onChange, error }: RoleSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="role" className="block text-sm font-medium text-text-primary">
        Role
      </label>
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border bg-bg-main px-4 py-2.5 text-text-primary focus:outline-none focus:ring-0 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-border-light focus:border-border-light"
        }`}
      >
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

