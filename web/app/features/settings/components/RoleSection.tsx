import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/Select";
import { formatRole } from "~/shared/utils";

interface RoleSectionProps {
  role: "" | "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER";
  onRoleChange: (value: "" | "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER") => void;
  error?: string;
}

const roleOptions = [
  { value: "COORDINATOR", label: "Coordinator" },
  { value: "BUDGET_MANAGER", label: "Budget Manager" },
  { value: "TECHNICAL_MANAGER", label: "Technical Manager" },
];

export function RoleSection({ role, onRoleChange, error }: RoleSectionProps) {
  const selectedRoleLabel = role ? formatRole(role) : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role</CardTitle>
        <CardDescription>Your current role in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={role} onValueChange={(value) => onRoleChange(value as typeof role)}>
            <SelectTrigger id="role" className={error ? "border-red-500 focus:border-red-500" : ""}>
              <SelectValue placeholder="Select a role">
                {selectedRoleLabel || "Select a role"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

