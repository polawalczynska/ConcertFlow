import { AuthGuard } from "~/features/auth/components";

export function ConcertPageLoading() {
  return (
    <AuthGuard>
      <div className="p-8 min-h-screen">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-main border-t-transparent" />
        </div>
      </div>
    </AuthGuard>
  );
}

