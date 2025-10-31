import { User } from "lucide-react";

interface NameInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
}

export default function NameInput({id, name, label, placeholder}: NameInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"/>
        <input
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
          className="w-full rounded-lg border border-border-light bg-bg-main px-4 py-2.5 pl-10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 focus:border-border-light"
          required
        />
      </div>
    </div>
  );
}

