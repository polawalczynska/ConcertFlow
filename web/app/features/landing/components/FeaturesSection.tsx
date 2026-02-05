import { features } from "~/features/landing/data/features";

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/80 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(148,163,184,0.15)_1px,_transparent_0)] bg-[length:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-purple-main to-purple-dark bg-clip-text text-transparent">Manage Concerts</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A comprehensive toolkit designed for modern concert production teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-main to-purple-dark rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
