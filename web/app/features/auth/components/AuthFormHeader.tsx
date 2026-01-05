interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export default function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="space-y-1 p-6 pb-4 text-center">
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
}

