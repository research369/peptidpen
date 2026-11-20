import { useProducts } from "../hooks/useProducts";
import { getPenBuyUrl } from "../lib/config";

export default function PenSystemBanner() {
  const { penProduct } = useProducts();
  const penPrice = penProduct?.price ?? 49;

  return (
    <section className="pen-system-section">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-14 items-start">
          <div className="pen-system-copy">
            <div className="staging-kicker staging-kicker-light">AUFBAU 369</div>
            <h2>DER PEN BLEIBT.<br /><span>DIE PATRONE WECHSELT.</span></h2>
            <p>
              Der 369 Peptid-Pen ist wiederverwendbar und mit den austauschbaren
              369 Plug&amp;Play Patronen kompatibel.
            </p>
            <div className="pen-price-card">
              <span>PEPTID-PEN SET</span>
              <strong>{penPrice} €</strong>
              <small>inklusive Case und 3 Pen-Nadeln</small>
            </div>
            <a href={getPenBuyUrl()} target="_blank" rel="noopener noreferrer" className="staging-light-button">
              PEPTID-PEN KAUFEN
            </a>
            <div className="fixed-price-note">
              <strong>FESTE PATRONENPREISE</strong>
              <span>Kein Aufpreis-Modell. Jede Patrone hat ihren eigenen verbindlichen Produktpreis.</span>
            </div>
          </div>

          <div className="pen-infographic">
            <img
              src="/assets/aufbau-369-plugplay.webp"
              alt="Aufbau des 369 Plug&Play Pen-Systems mit Doppelkammerpatrone"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
