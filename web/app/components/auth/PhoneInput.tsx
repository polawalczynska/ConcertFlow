import { Phone } from "lucide-react";

interface PhoneInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="phone" className="block text-sm font-medium text-text-primary">
        Phone <span className="text-text-muted">(optional)</span>
      </label>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          id="phone"
          name="phone"
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="+1 555 0100"
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

