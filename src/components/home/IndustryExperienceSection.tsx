import { Landmark, ShoppingCart, Newspaper, Tv, Building2 } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

const industryIcons: Record<string, React.ElementType> = {
  Landmark,
  ShoppingCart,
  Newspaper,
  Tv,
};

export default function IndustryExperienceSection() {
  const { industries } = portfolioData;

  return (
    <section className="py-20 bg-white border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-accent-blue uppercase bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            <Building2 className="w-3.5 h-3.5 text-accent-blue" />
            <span>Domain Exposure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
            Industry Experience
          </h2>
          <p className="text-base text-gray-600 font-normal">
            Practical contributions across enterprise domains, digital commerce, and broadcast environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = industryIcons[ind.icon] || Building2;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-gray-300 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-navy-950">
                  <Icon className="w-5 h-5 text-accent-blue" />
                </div>
                <h3 className="text-lg font-bold text-navy-950">{ind.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{ind.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
