import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles, Music, Users, Mic2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Floating decorative icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Music className="absolute top-24 left-[10%] w-8 h-8 text-purple-200 animate-bounce-subtle opacity-60" />
        <Mic2 className="absolute top-40 right-[15%] w-10 h-10 text-purple-300/50 animate-bounce-subtle" style={{ animationDelay: "0.5s" }} />
        <Users className="absolute bottom-32 left-[20%] w-6 h-6 text-blue-200 animate-bounce-subtle" style={{ animationDelay: "1s" }} />
        <Sparkles className="absolute bottom-24 right-[25%] w-7 h-7 text-amber-200 animate-bounce-subtle" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>Streamline Your Concert Production</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Perfect Concerts.
            <br />
            <span className="bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent relative">
              Seamless Workflow.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-purple-300/50" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 7 Q50 0, 100 7 T200 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-purple-main to-purple-dark text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-300 flex items-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-slate-500 mb-4">
              Trusted by event coordinators, budget managers, and technical teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">SOC 2 Compliant</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Free Trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

