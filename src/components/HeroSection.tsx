import type { ReactNode } from "react";
import { useProducts } from "../hooks/useProducts";
import { PEN_BUY_URL } from "../lib/config";

const FALLBACK_PEN_PRICE = 39;

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
          <span>Entwickelt in Deutschland</span>
          <span>Gekühlter Versand</span>
          <span>Dynamische Live-Bestände</span>
          <span>Research Use Only</span>
        </div>
      </div>

      <header className="relative z-20 border-b border-blue-100/80 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 md:h-24 flex items-center justify-between gap-6">
          <a href="/" aria-label="369 Research Startseite" className="shrink-0">
            <img src="/assets/369-research-logo.png" alt="369 Research" className="h-12 md:h-16 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-[#0a327b]">
            <a href="#produkte" className="hover:text-[#0878ee] transition-colors">Patronen</a>
            <a href="#system" className="hover:text-[#0878ee] transition-colors">Das System</a>
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
            <div className="eyebrow"><span /> DAS 369 PLUG&amp;PLAY-SYSTEM</div>
            <h1 className="hero-title">
              Forschungspen.<br />
              <span>Patrone einsetzen.</span><br />
              Direkt starten.
            </h1>
            <p className="hero-copy">
              Wiederverwendbarer 369 Research Pen und fertig vorbereitete Plug&amp;Play-Patronen – zentral aus dem aktuellen Shopbestand, ohne Mischen und ohne manuelle Konzentrationsberechnung.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#produkte" className="btn-primary text-base md:text-lg !rounded-full !px-8 !py-4">
                Patronen direkt auswählen <span aria-hidden="true">→</span>
              </a>
              <a href={PEN_BUY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base !rounded-full !px-7 !py-4">
                Pen kaufen · {loading ? "…" : `${penPrice} €`}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-9 max-w-2xl">
              <div className="hero-proof"><strong>3 ml</strong><span>Standardpatrone</span></div>
              <div className="hero-proof"><strong>Live</strong><span>Preis &amp; Bestand</span></div>
              <div className="hero-proof"><strong>48 h</strong><span>gekühlter Versand</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-glow" aria-hidden="true" />
            <div className="hero-image-card">
              <img src="/assets/research-pen.png" alt="369 Research Pen im Etui mit Zubehör" className="hero-product-image" />
              <div className="hero-image-label">
                <small>WIEDERVERWENDBAR</small>
                <strong>369 Research Pen</strong>
                <span>kompatibel mit allen 369 Plug&amp;Play-Patronen</span>
              </div>
            </div>
            <div className="floating-badge floating-badge-top"><Icon>✓</Icon><span><b>Ein System</b><small>für alle Patronen</small></span></div>
            <div className="floating-badge floating-badge-bottom"><Icon>❄</Icon><span><b>Kühl versendet</b><small>sicher verpackt</small></span></div>
          </div>
        </div>

        <div className="benefit-strip">
          {[
            ["01", "Patrone wählen", "Produkt und Variante aus dem Live-Sortiment"],
            ["02", "Im Shop bestellen", "Weiter in den bewährten 369 Checkout"],
            ["03", "Einsetzen & forschen", "Kein Mischen, kein Umfüllen"],
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
