import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles, Music, Users, Mic2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <Music className="absolute top-32 left-[15%] w-8 h-8 text-red-300/40 animate-bounce-subtle" />
        <Mic2 className="absolute top-48 right-[20%] w-10 h-10 text-red-400/30 animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
        <Users className="absolute bottom-32 left-[25%] w-9 h-9 text-red-300/30 animate-bounce-subtle" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-48 right-[15%] w-7 h-7 text-red-400/40 animate-bounce-subtle" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100/80 backdrop-blur-sm border border-red-200 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">The Future of Concert Management</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Perfect Concerts.
            <br />
            <span className="bg-gradient-to-r from-red-600 via-red-main to-red-dark bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
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
              className="group relative bg-gradient-to-r from-red-600 to-red-main text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-main to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Get Started Free</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-red-300 hover:bg-red-50/50 transition-all backdrop-blur-sm"
            >
              Sign In
              <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-slate-200/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-slate-500 mb-4">
              Trusted by event coordinators, budget managers, and technical teams worldwide
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">500+ Events Managed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

