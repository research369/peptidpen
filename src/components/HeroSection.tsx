import type { ReactNode } from "react";
import { useProducts } from "../hooks/useProducts";
import { getPenBuyUrl } from "../lib/config";

const FALLBACK_PEN_PRICE = 49;
const PEN_IMAGES = [
  "https://www.369research.eu/products/peptidpen-case-1.png",
  "https://www.369research.eu/products/peptidpen-case-2.png",
  "https://www.369research.eu/products/peptidpen-case-3.png",
];

const Icon = ({ children }: { children: ReactNode }) => (
  <span className="lab-icon" aria-hidden="true">{children}</span>
);

export default function HeroSection() {
  const { penProduct, loading } = useProducts();
  const penPrice = penProduct?.price ?? FALLBACK_PEN_PRICE;

  return (
    <section className="lab-hero">
      <div className="molecule-field molecule-field-left" aria-hidden="true" />
      <div className="molecule-field molecule-field-right" aria-hidden="true" />

      <div className="lab-topline">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-1">
          <span>369 Research</span>
          <span>Pen + Case + 3 Nadeln</span>
          <span>Mix &amp; Go oder fertig gemischt</span>
          <span>Research Use Only</span>
        </div>
      </div>

      <header className="relative z-20 border-b border-blue-100/80 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 md:h-24 flex items-center justify-between gap-6">
          <a href="/" aria-label="369 Research Startseite" className="shrink-0">
            <img src="/assets/369-research-logo.png" alt="369 Research" className="h-12 md:h-16 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-[#0a327b]">
            <a href="#system" className="hover:text-[#0878ee] transition-colors">So funktioniert es</a>
            <a href="#produkte" className="hover:text-[#0878ee] transition-colors">Produkte</a>
            <a href="#faq" className="hover:text-[#0878ee] transition-colors">FAQ</a>
          </nav>
          <a href="#produkte" className="btn-primary !rounded-full !px-5 md:!px-7 !py-3 text-sm whitespace-nowrap">
            Produkte wählen
          </a>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="eyebrow"><span /> PEPTIDE EINFACHER VORBEREITEN</div>
            <h1 className="hero-title">
              Ein Pen.<br />
              <span>Dein Produkt.</span><br />
              Die passende Patrone.
            </h1>
            <p className="hero-copy">
              Wähle dein Forschungsprodukt direkt als Pen-Patrone: zum selbst Vorbereiten
              mit BAC-Wasser oder bereits fertig gemischt und gekühlt geliefert.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#produkte" className="btn-primary text-base md:text-lg !rounded-full !px-8 !py-4">
                Patronen wählen <span aria-hidden="true">→</span>
              </a>
              <a href={getPenBuyUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base !rounded-full !px-6 !py-4 whitespace-nowrap">
                Pen-Set kaufen · {loading ? "…" : `${penPrice} €`}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-9 max-w-xl">
              <div className="hero-proof"><strong>Mix &amp; Go</strong><span>Pulver in der Patrone · BAC-Wasser ergänzen</span></div>
              <div className="hero-proof"><strong>Plug &amp; Play</strong><span>Fertig gemischt · gekühlt geliefert</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-glow" aria-hidden="true" />
            <div className="hero-image-card">
              <img src={PEN_IMAGES[0]} alt="369 Research Peptidpen mit Case und Zubehör" className="hero-product-image" />
              <div className="hero-image-label">
                <small>WIEDERVERWENDBAR · KOMPLETTES SET</small>
                <strong>Peptidpen · 49 €</strong>
                <span>inklusive Case und 3 Pen-Nadeln</span>
              </div>
            </div>
            <div className="hero-thumbnails" aria-label="Weitere Produktansichten">
              {PEN_IMAGES.slice(1).map((src, index) => <img key={src} src={src} alt={`Peptidpen Produktansicht ${index + 2}`} />)}
            </div>
            <div className="floating-badge floating-badge-top"><Icon>1</Icon><span><b>Patrone einsetzen</b><small>Produkt direkt in der Patrone</small></span></div>
            <div className="floating-badge floating-badge-bottom"><Icon>2</Icon><span><b>Einheiten einstellen</b><small>am wiederverwendbaren Pen</small></span></div>
          </div>
        </div>

        <div className="benefit-strip">
          {[
            ["01", "Pen einmal kaufen", "49 € inklusive Case und 3 Nadeln"],
            ["02", "Produkt als Patrone wählen", "Passende Stärke und Variante auswählen"],
            ["03", "Patrone wechseln", "Der Pen bleibt und wird wiederverwendet"],
          ].map(([number, title, text]) => (
            <div className="benefit-step" key={number}>
              <span>{number}</span><div><b>{title}</b><small>{text}</small></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
