interface BrandHeaderProps {
  subtitle: string;
}

export default function BrandHeader({ subtitle }: BrandHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <div className="inline-block">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent leading-tight">
          ConcertFlow
        </h1>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-purple-main to-purple-dark"></div>
      </div>
      <p className="mt-4 text-base text-text-secondary font-medium">{subtitle}</p>
    </div>
  );
}

