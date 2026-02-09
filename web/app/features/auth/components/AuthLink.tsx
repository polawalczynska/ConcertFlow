import { Link } from "@remix-run/react";

interface AuthLinkProps {
  question: string;
  linkText: string;
  to: string;
}

export default function AuthLink({ question, linkText, to }: AuthLinkProps) {
  return (
    <p className="mt-6 text-center text-sm text-text-secondary">
      {question}{" "}
      <Link to={to} className="font-medium text-pink-main hover:underline">
        {linkText}
      </Link>
    </p>
  );
}

