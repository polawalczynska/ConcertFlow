interface AssignedConcertsTabHeaderProps {
  title?: string;
}

export function AssignedConcertsTabHeader({ title = "Assigned Concerts" }: AssignedConcertsTabHeaderProps) {
  return <h3 className="mb-4 text-lg font-semibold text-text-primary">{title}</h3>;
}

