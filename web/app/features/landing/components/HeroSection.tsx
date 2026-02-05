import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/15 to-pink-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>The future of concert management</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Perfect Concerts.
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent">
                Seamless Workflow.
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 4C200 6 250 2 298 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" className="animate-[dash_1.5s_ease-in-out_forwards]" style={{ strokeDasharray: 300, strokeDashoffset: 300 }} />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#A78BFA" />
                    <stop offset="1" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/signup"
              className="group relative bg-gradient-to-r from-purple-main to-purple-dark text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-dark to-purple-main opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          <p className="text-sm text-slate-500 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Trusted by event coordinators, budget managers, and technical teams worldwide
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">500+</div>
              <div className="text-sm text-slate-500 mt-1">Events Managed</div>
            </div>
            <div className="text-center border-x border-slate-200">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">98%</div>
              <div className="text-sm text-slate-500 mt-1">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-500 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
