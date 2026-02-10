import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles, Music, Users, Calendar } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <Music className="absolute top-32 left-[15%] w-8 h-8 text-purple-300/40 animate-bounce-subtle" />
        <Calendar className="absolute top-48 right-[20%] w-10 h-10 text-purple-400/30 animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
        <Users className="absolute bottom-32 left-[25%] w-9 h-9 text-purple-300/35 animate-bounce-subtle" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-60 left-[10%] w-6 h-6 text-amber-400/40 animate-bounce-subtle" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>The #1 Concert Management Platform</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Perfect Concerts.
            <br />
            <span className="bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent animate-gradient">
              Seamless Workflow.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-purple-main to-purple-dark text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-300 hover:bg-purple-50/50 transition-all flex items-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white" />
              </div>
              <span>Trusted by 500+ teams</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
