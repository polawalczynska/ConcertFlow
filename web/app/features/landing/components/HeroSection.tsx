import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
            Spectacular Events.
            <br />
            <span className="bg-gradient-to-r from-purple-dark via-purple-main to-purple-light bg-clip-text text-transparent">
              Professional Management.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="group bg-purple-main text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              Sign In
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Trusted by event coordinators, budget managers, and technical teams worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

