import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Search } from "lucide-react";

interface EmailSearchFieldProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSearch: (email: string) => void;
}

export function EmailSearchField({ email, onEmailChange, onSearch }: EmailSearchFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          className="pl-10"
          value={email}
          onChange={(e) => {
            const newEmail = e.target.value;
            onEmailChange(newEmail);
            onSearch(newEmail);
          }}
          required
        />
      </div>
    </div>
  );
}

