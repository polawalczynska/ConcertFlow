import { Link } from "@remix-run/react";

interface NavbarLogoProps {
  homePage: string;
}

export function NavbarLogo({ homePage }: NavbarLogoProps) {
  return (
    <div className="flex items-center">
      <Link to={homePage} className="flex flex-col items-start">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent leading-tight">
          ConcertFlow
        </h1>
        <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-purple-main to-purple-dark mt-0.5"></div>
      </Link>
    </div>
  );
}

