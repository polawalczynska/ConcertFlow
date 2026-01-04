import { LogOut } from "lucide-react";
import { useLogout } from "~/hooks/useAuth";

interface LogoutButtonProps {
  variant?: "desktop" | "mobile";
}

export function LogoutButton({ variant = "desktop" }: LogoutButtonProps) {
  const logout = useLogout();

  if (variant === "mobile") {
    return (
      <button
        onClick={() => logout.mutate()}
        className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => logout.mutate()}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
}

