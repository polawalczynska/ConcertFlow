interface RoleSelectProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export default function RoleSelect({ value, onChange, error }: RoleSelectProps = {}) {
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
        <option value="">Select your role</option>
        <option value="COORDINATOR">Coordinator</option>
        <option value="BUDGET_MANAGER">Budget Manager</option>
        <option value="TECHNICAL_MANAGER">Technical Manager</option>
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
