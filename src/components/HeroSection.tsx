import { useProducts } from "../hooks/useProducts";
import { getShopProductUrl } from "../lib/config";

export default function HeroSection() {
  const { penProduct, loading } = useProducts();

  const penPrice = penProduct?.price ?? null;

  return (
    <section className="relative min-h-screen bg-brand-dark overflow-hidden flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-navy to-blue-950" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #0040C1 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #1a3a6e 0%, transparent 40%)`,
        }}
      />

      {/* Decorative molecule pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3Ccircle cx='55' cy='5' r='2'/%3E%3Ccircle cx='5' cy='55' r='2'/%3E%3Ccircle cx='55' cy='55' r='2'/%3E%3Cline x1='5' y1='5' x2='30' y2='30' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cline x1='55' y1='5' x2='30' y2='30' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/20 border border-brand-blue/40 rounded-full text-brand-blue text-sm font-semibold mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse-slow" />
            Entwickelt &amp; produziert in Deutschland
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
            Der erste<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">
              wiederverwendbare
            </span><br />
            Peptid-Pen Europas.
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-blue-200/80 font-light mb-4 max-w-2xl">
            Fertig gemischte Peptid-Patronen. Einfach einsetzen, fertig.
          </p>
          <p className="text-base md:text-lg text-white/50 mb-10 max-w-xl">
            Kein Mischen. Kein Rechnen. Keine Fehler. Nur Forschung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#produkte"
              className="btn-primary text-lg px-8 py-4 cta-pulse"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Jetzt Patronen entdecken
            </a>
            {penProduct && (
              <a
                href={getShopProductUrl(penProduct.shopProductId)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 bg-transparent text-white border-white/30 hover:bg-white hover:text-brand-navy"
              >
                Pen kaufen
                {!loading && penPrice !== null && (
                  <span className="ml-1 text-brand-gold font-bold">
                    {penPrice} €
                  </span>
                )}
              </a>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "< 60 Sek.", label: "Anwendungszeit" },
              { value: "99%+", label: "Reinheit" },
              { value: "Made in DE", label: "Produktion" },
              { value: "RUO", label: "Research Use Only" },
            ].map((stat) => (
              <div key={stat.label} className="card-glass text-center">
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Mehr entdecken</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
