import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles, Music, Users, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-200/30 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating icons decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-[15%] opacity-20">
          <Music className="w-8 h-8 text-purple-400 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        </div>
        <div className="absolute top-60 right-[20%] opacity-20">
          <Sparkles className="w-6 h-6 text-purple-500 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        </div>
        <div className="absolute bottom-32 left-[25%] opacity-20">
          <Zap className="w-7 h-7 text-purple-400 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
        </div>
        <div className="absolute bottom-48 right-[15%] opacity-20">
          <Users className="w-6 h-6 text-purple-500 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 backdrop-blur-sm border border-purple-200/50 text-purple-700 text-sm font-medium mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>The future of concert management</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
            Perfect Concerts.
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Seamless Workflow.
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            End-to-end platform for concert planning, team coordination, and flawless execution.
            <span className="text-slate-500"> Streamline your workflow from budget approval to technical requirements.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/signup"
              className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-300 hover:bg-purple-50/50 transition-all flex items-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium shadow-sm"
                >
                  {['JD', 'MK', 'AS', 'TC'][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium text-slate-700">Trusted by 500+ teams</span>
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-1 text-slate-600 font-medium">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
