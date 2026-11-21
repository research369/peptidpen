import { useProducts } from "../hooks/useProducts";
import { getPenBuyUrl } from "../lib/config";

const FALLBACK_PEN_PRICE = 49;
const PEN_IMAGES = [
  "https://www.369research.eu/products/peptidpen-case-1.png",
  "https://www.369research.eu/products/peptidpen-case-2.png",
  "https://www.369research.eu/products/peptidpen-case-3.png",
];

export default function HeroSection() {
  const { penProduct, loading } = useProducts();
  const penPrice = penProduct?.price ?? FALLBACK_PEN_PRICE;

  return (
    <section className="staging-hero">
      <div className="staging-grid" aria-hidden="true" />
      <header className="staging-header">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-5">
          <a href="/" aria-label="369 Research Peptidpen Startseite">
            <img src="/assets/369-research-logo.png" alt="369 Research" className="h-12 md:h-14 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#system">PEN-SYSTEM ERKLÄRT</a>
            <a href="#rabatte">RABATTE</a>
            <a href="#produkte">PATRONEN</a>
            <a href="/checkout">DEINE AUSWAHL</a>
          </nav>
          <a href={getPenBuyUrl()} target="_blank" rel="noopener noreferrer" className="staging-outline-button">
            PEN KAUFEN
          </a>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-14 md:py-20">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="staging-kicker">369 RESEARCH · PLUG&amp;PLAY PEN-SYSTEM</div>
            <h1 className="staging-hero-title">
              DER ERSTE ECHTE<br />
              <span>PEPTID-PEN</span><br />
              EUROPAS.
            </h1>
            <p className="staging-hero-copy">
              Mit der austauschbaren <strong>369 Plug&amp;Play Patrone.</strong>{" "}
              Ein Klick. Pulver und BAC-Wasser vermischen sich direkt in der Patrone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#produkte" className="staging-primary-button">PATRONEN ENTDECKEN</a>
              <a href="#system" className="staging-outline-button">SO FUNKTIONIERT PLUG&amp;PLAY</a>
            </div>
          </div>

          <div className="staging-product-stage">
            <a href={getPenBuyUrl()} target="_blank" rel="noopener noreferrer" className="staging-product-card">
              <img src={PEN_IMAGES[0]} alt="369 Research Peptid-Pen mit Case und Zubehör" />
              <div className="staging-product-caption">
                <span>PEPTID-PEN SET</span>
                <strong>{loading ? "49 €" : `${penPrice} €`}</strong>
                <small>INKLUSIVE CASE UND 3 PEN-NADELN</small>
              </div>
            </a>
            <div className="staging-thumbnails" aria-label="Weitere Produktansichten">
              {PEN_IMAGES.slice(1).map((src, index) => (
                <img src={src} key={src} alt={`Peptid-Pen Ansicht ${index + 2}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
