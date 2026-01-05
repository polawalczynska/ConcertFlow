import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

interface AccountInfoSectionProps {
  email: string;
  phone: string;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  errors?: {
    email?: string;
    phone?: string;
  };
}

export function AccountInfoSection({
  email,
  phone,
  onEmailChange,
  onPhoneChange,
  errors,
}: AccountInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Manage your account contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email address"
            className={errors?.email ? "border-red-500 focus:border-red-500" : ""}
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="Enter your phone number"
            className={errors?.phone ? "border-red-500 focus:border-red-500" : ""}
          />
          {errors?.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

