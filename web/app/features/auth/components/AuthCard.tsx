import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="rounded-xl border-0 bg-bg-card shadow-xl">{children}</div>
  );
}

