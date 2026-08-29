import { useProducts } from "../hooks/useProducts";
import { getPenBuyUrl, config } from "../lib/config";

const FALLBACK_PEN_PRICE = 49;

export default function PenSystemBanner() {
  const { penProduct, loading } = useProducts();
  const penPrice = penProduct?.price ?? FALLBACK_PEN_PRICE;
  const surcharge = config.plugplaySurcharge ?? 15;

  return (
    <section id="system" className="section-darker py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge badge-gold mb-4">Das Pen-System</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ein Pen. Zwei Patronen-Optionen.
            </h2>
            <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
              Mix &amp; Go ist unsere bevorzugte Lösung. Plug &amp; Play ist die gekühlte Komfort-Option.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <article className="card-glass card-recommended relative overflow-hidden">
              <span className="badge bg-brand-gold text-brand-dark text-xs mb-5">Empfohlen</span>
              <h3 className="text-2xl font-bold text-white mb-3">Mix &amp; Go</h3>
              <p className="text-blue-200/70 leading-relaxed mb-6">
                Das Produktpulver befindet sich bereits in der Patrone. BAC-Wasser ergänzen,
                nach Vorgabe vorbereiten und die passende Patrone in den Pen einsetzen.
              </p>
              <div className="text-brand-gold font-bold text-lg mb-6">Ohne gekühlten Versand</div>
              <a href="#produkte" className="btn-secondary w-full text-center !rounded-full">
                Mix &amp; Go auswählen →
              </a>
            </article>

            <article className="card-glass relative overflow-hidden">
              <span className="badge bg-brand-blue/30 text-blue-200 text-xs mb-5">Komfort-Option</span>
              <h3 className="text-2xl font-bold text-white mb-3">Plug &amp; Play</h3>
              <p className="text-blue-200/70 leading-relaxed mb-6">
                Die Patrone wird fertig gemischt und gekühlt versendet. Sie ist ohne vorheriges Anmischen einsatzbereit.
              </p>
              <div className="text-brand-gold font-bold text-lg mb-6">+{surcharge} € gegenüber Mix &amp; Go</div>
              <a href="#produkte" className="btn-primary w-full text-center !rounded-full">
                Plug &amp; Play auswählen →
              </a>
            </article>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <div className="text-white font-bold text-xl">Peptidpen mit Case + 3 Nadeln</div>
              <div className="text-blue-200/60 mt-1">Einmal kaufen und für passende Patronen wiederverwenden.</div>
            </div>
            <a href={getPenBuyUrl()} target="_blank" rel="noopener noreferrer" className="btn-gold !rounded-full whitespace-nowrap">
              Pen kaufen · {loading ? "…" : `${penPrice} €`} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
