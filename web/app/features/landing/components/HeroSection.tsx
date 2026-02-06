import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 -left-20 w-60 h-60 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>The Modern Concert Management Platform</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in">
            Perfect Concerts.
            <br />
            <span className="bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent drop-shadow-sm">
              Seamless Workflow.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link
              to="/signup"
              className="group relative bg-gradient-to-r from-purple-main to-purple-dark text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-dark to-purple-main opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-slate-200/50">
            <p className="text-sm text-slate-500 mb-4">
              Trusted by event coordinators, budget managers, and technical teams worldwide
            </p>
            <div className="flex justify-center gap-8 opacity-60">
              <div className="w-20 h-8 bg-slate-300 rounded animate-pulse" />
              <div className="w-24 h-8 bg-slate-300 rounded animate-pulse delay-100" />
              <div className="w-20 h-8 bg-slate-300 rounded animate-pulse delay-200" />
              <div className="w-28 h-8 bg-slate-300 rounded animate-pulse delay-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

