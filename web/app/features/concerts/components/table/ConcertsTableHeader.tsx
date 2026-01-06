export function ConcertsTableHeader() {
  return (
    <thead className="bg-bg-secondary">
      <tr>
        <th className="w-[20%] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
          Name
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
          Artist
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
          Date
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
          Venue
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
          City
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
          Status
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
          Budget
        </th>
        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-secondary">
          Actions
        </th>
      </tr>
    </thead>
  );
}

