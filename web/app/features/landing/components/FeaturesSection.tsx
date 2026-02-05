import { features } from "~/features/landing/data/features";

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Everything You Need to Manage Concerts
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A comprehensive suite of tools designed to streamline every aspect of concert production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:shadow-purple-500/30 transition-all duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
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
