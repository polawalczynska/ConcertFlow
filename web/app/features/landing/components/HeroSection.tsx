import { Link } from "@remix-run/react";
import { ArrowRight, Music, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50" />

      {/* Floating decorative elements */}
      <div className="absolute top-40 left-10 animate-bounce-subtle opacity-20">
        <Music className="w-16 h-16 text-purple-400" />
      </div>
      <div className="absolute top-60 right-16 animate-bounce-subtle opacity-20" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-12 h-12 text-purple-300" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-bounce-subtle opacity-15" style={{ animationDelay: '1s' }}>
        <Zap className="w-10 h-10 text-blue-400" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>The future of concert management</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Perfect Concerts.
            <br />
            <span className="bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
              Seamless Workflow.
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-purple-main to-purple-dark text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-slate-500 mb-4">
              Trusted by event coordinators, budget managers, and technical teams worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white" />
                </div>
                <span className="text-sm text-slate-600 font-medium">500+ teams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
