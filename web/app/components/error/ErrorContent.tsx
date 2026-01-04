interface ErrorContentProps {
  title: string;
  message: string;
}

export function ErrorContent({ title, message }: ErrorContentProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        {title}
      </h2>
      <p className="text-lg text-text-secondary max-w-md mx-auto">
        {message}
      </p>
    </div>
  );
}

