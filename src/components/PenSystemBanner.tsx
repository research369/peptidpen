import { useProducts } from "../hooks/useProducts";
import { getPenBuyUrl, config } from "../lib/config";

const FALLBACK_PEN_PRICE = 49;

export default function PenSystemBanner() {
  const { penProduct, loading } = useProducts();
  const penPrice = penProduct?.price ?? FALLBACK_PEN_PRICE;
  const surcharge = config.plugplaySurcharge ?? 15;

  return (
    <section id="patronen" className="section-darker py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge badge-gold mb-4">Welche Patrone passt zu dir?</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Selbst vorbereiten oder fertig geliefert.
            </h2>
            <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
              Das Produkt ist bei beiden Varianten bereits in der passenden Pen-Patrone.
              Du entscheidest nur, wer die Vorbereitung übernimmt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <article className="card-glass card-recommended relative overflow-hidden">
              <span className="badge bg-white/10 text-blue-200 text-xs mb-5">Selbst vorbereiten</span>
              <h3 className="text-2xl font-bold text-white mb-3">Mix &amp; Go</h3>
              <p className="text-blue-200/70 leading-relaxed mb-6">
                Das gefriergetrocknete Produkt befindet sich bereits in der Patrone.
                Du ergänzt BAC-Wasser, lässt es vollständig lösen und setzt die Patrone anschließend in den Pen ein.
              </p>
              <div className="text-brand-gold font-bold text-lg mb-6">Pulver + Patrone · keine Kühlkette nötig</div>
              <a href="#produkte" className="btn-secondary w-full text-center !rounded-full">
                Mix &amp; Go auswählen →
              </a>
            </article>

            <article className="card-glass relative overflow-hidden">
              <span className="badge bg-brand-blue/30 text-blue-200 text-xs mb-5">Fertig vorbereitet</span>
              <h3 className="text-2xl font-bold text-white mb-3">Plug &amp; Play</h3>
              <p className="text-blue-200/70 leading-relaxed mb-6">
                Wir übernehmen die Vorbereitung. Die Patrone kommt bereits fertig gemischt und wird durchgehend gekühlt versendet.
              </p>
              <div className="text-brand-gold font-bold text-lg mb-6">Fertig gemischt · gekühlter Versand · +{surcharge} €</div>
              <a href="#produkte" className="btn-primary w-full text-center !rounded-full">
                Plug &amp; Play auswählen →
              </a>
            </article>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <div className="text-white font-bold text-xl">Noch keinen Pen?</div>
              <div className="text-blue-200/60 mt-1">Das Set enthält den wiederverwendbaren Peptidpen, ein Case und 3 Pen-Nadeln.</div>
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
