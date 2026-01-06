import { Mail } from "lucide-react";

interface EmailInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function EmailInput({ value, onChange, error }: EmailInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-text-primary">
        Email
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          id="email"
          name="email"
          type="email"
          value={value}
          onChange={onChange}
          placeholder="kate.johnson@concertflow.com"
          className={`w-full rounded-lg border bg-bg-main px-4 py-2.5 pl-10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-border-light focus:border-border-light"
          }`}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

