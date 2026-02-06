import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            <span className="bg-gradient-to-r from-purple-600 via-purple-main to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite]">
              Seamless Workflow.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            End-to-end platform for concert planning, team coordination, and flawless execution.
            Streamline your workflow from budget approval to technical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/signup"
              className="group relative bg-gradient-to-r from-purple-600 to-purple-main text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-main to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Get Started Free</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50/50 transition-all duration-300"
            >
              Sign In
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-slate-500 mb-4">
              Trusted by event coordinators, budget managers, and technical teams worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="w-24 h-8 bg-slate-300 rounded"></div>
              <div className="w-20 h-8 bg-slate-300 rounded"></div>
              <div className="w-28 h-8 bg-slate-300 rounded"></div>
              <div className="w-24 h-8 bg-slate-300 rounded hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

