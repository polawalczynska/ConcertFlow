interface ErrorCodeDisplayProps {
  statusCode: number;
}

export function ErrorCodeDisplay({ statusCode }: ErrorCodeDisplayProps) {
  return (
    <div className="mb-8">
      <h1 className="text-9xl sm:text-[12rem] font-bold bg-gradient-to-r from-pink-main via-pink-light to-pink-dark bg-clip-text text-transparent leading-none">
        {statusCode}
      </h1>
      <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-main to-pink-dark"></div>
    </div>
  );
}

