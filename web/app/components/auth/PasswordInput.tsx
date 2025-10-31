import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export default function PasswordInput({
  id,
  name,
  label,
  placeholder,
  showPassword: controlledShowPassword,
  onTogglePassword,
}: PasswordInputProps) {
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  const showPassword = controlledShowPassword ?? internalShowPassword;
  const handleToggle = onTogglePassword ?? (() => setInternalShowPassword(!internalShowPassword));

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border-light bg-bg-main px-4 py-2.5 pl-10 pr-10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 focus:border-border-light"
          required
        />
        <button
          type="button"
          onClick={handleToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

