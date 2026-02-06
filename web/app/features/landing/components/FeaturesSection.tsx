import { features } from "~/features/landing/data/features";

const iconGradients = [
  "from-purple-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-green-500 to-emerald-500",
  "from-indigo-500 to-purple-500",
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Manage Concerts
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Powerful tools designed to streamline every aspect of your concert production workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const gradientClass = iconGradients[index % iconGradients.length];
            return (
              <div
                key={feature.title}
                className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

