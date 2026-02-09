import { Link } from "@remix-run/react";

export function LandingNavigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col items-start">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-main via-pink-light to-pink-dark bg-clip-text text-transparent leading-tight">
                ConcertFlow
              </h1>
              <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-pink-main to-pink-dark mt-0.5"></div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-pink-main text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

