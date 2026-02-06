import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-[10%] w-2 h-2 bg-purple-400 rounded-full animate-bounce-subtle opacity-60" />
        <div className="absolute top-60 right-[15%] w-3 h-3 bg-blue-400 rounded-full animate-bounce-subtle opacity-50" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-[20%] w-2 h-2 bg-pink-400 rounded-full animate-bounce-subtle opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute top-32 right-[25%] w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce-subtle opacity-70" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700">The Future of Concert Management</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Perfect Concerts.
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-purple-main to-purple-light bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              Seamless Workflow.
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/signup"
              className="group relative bg-gradient-to-r from-purple-600 to-purple-main text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Get Started Free</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Sign In
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-slate-500 mb-4">
              Trusted by event coordinators, budget managers, and technical teams worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="h-8 w-20 bg-slate-300 rounded animate-pulse" />
              <div className="h-8 w-24 bg-slate-300 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="h-8 w-16 bg-slate-300 rounded animate-pulse" style={{ animationDelay: '0.4s' }} />
              <div className="h-8 w-20 bg-slate-300 rounded animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

