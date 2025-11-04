export default function Loading() {
  return (
    <div className="p-8 min-h-screen">
          <div className="mb-8">
            <div className="h-9 w-32 animate-pulse rounded bg-border-light" />
            <div className="mt-1 h-5 w-64 animate-pulse rounded bg-border-light" />
          </div>
          <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-border-light" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-xl bg-bg-card border border-border-light" />
            ))}
          </div>
    </div>
  );
}

