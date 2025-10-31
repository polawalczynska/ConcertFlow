export default function RoleSelect() {
  return (
    <div className="space-y-2">
      <label htmlFor="role" className="block text-sm font-medium text-text-primary">
        Role
      </label>
      <select
        id="role"
        name="role"
        className="w-full rounded-lg border border-border-light bg-bg-main px-4 py-2.5 text-text-primary focus:outline-none focus:ring-0 focus:border-border-light"
        required
      >
        <option value="">Select your role</option>
        <option value="coordinator">Coordinator</option>
        <option value="budget">Budget Manager</option>
        <option value="technical">Technical Manager</option>
      </select>
    </div>
  );
}

