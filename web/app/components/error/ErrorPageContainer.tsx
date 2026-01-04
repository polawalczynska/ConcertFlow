interface ErrorPageContainerProps {
  children: React.ReactNode;
}

export function ErrorPageContainer({ children }: ErrorPageContainerProps) {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {children}
      </div>
    </div>
  );
}

