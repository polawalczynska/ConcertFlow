import React from "react";

interface NameInputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function NameInput({ id, name, label, placeholder, value, onChange, error }: NameInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-bg-main px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-border-light focus:border-border-light"
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

