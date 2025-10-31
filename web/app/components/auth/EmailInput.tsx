import { Mail } from "lucide-react";

export default function EmailInput() {
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
          placeholder="kate.johnson@concertflow.com"
          className="w-full rounded-lg border border-border-light bg-bg-main px-4 py-2.5 pl-10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 focus:border-border-light"
          required
        />
      </div>
    </div>
  );
}

