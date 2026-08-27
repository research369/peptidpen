import { useProducts } from "../hooks/useProducts";
import { PEN_BUY_URL, config } from "../lib/config";

const FALLBACK_PEN_PRICE = 39;

export default function PenSystemBanner() {
  const { penProduct, loading } = useProducts();
  const penPrice = penProduct?.price ?? FALLBACK_PEN_PRICE;
  const surcharge = config.plugplaySurcharge ?? 15;

  return (
    <section id="system" className="section-darker py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge badge-gold mb-4">Ganz einfach</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ein Pen. Zwei Patronen-Optionen.
            </h2>
            <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
              Du entscheidest bei der Bestellung, wie du deine Patrone möchtest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <article className="card-glass relative overflow-hidden">
              <span className="badge bg-white/10 text-blue-200 text-xs mb-5">Selbst anmischen</span>
              <h3 className="text-2xl font-bold text-white mb-3">Mix &amp; Go</h3>
              <p className="text-blue-200/70 leading-relaxed mb-6">
                Du bekommst die passende Patrone und mischst sie selbst an. Danach einsetzen und den Pen verwenden.
              </p>
              <div className="text-brand-gold font-bold text-lg mb-6">Flexibel und wirtschaftlich</div>
              <a href="#produkte" className="btn-secondary w-full text-center !rounded-full">
                Mix &amp; Go auswählen →
              </a>
            </article>

            <article className="card-glass relative overflow-hidden">
              <span className="badge bg-brand-blue/30 text-blue-200 text-xs mb-5">Fertig vorbereitet</span>
              <h3 className="text-2xl font-bold text-white mb-3">Plug &amp; Play</h3>
              <p className="text-blue-200/70 leading-relaxed mb-6">
                Die Patrone kommt fertig gemischt. Einsetzen und direkt starten – ohne vorheriges Anmischen.
              </p>
              <div className="text-brand-gold font-bold text-lg mb-6">+{surcharge} € gegenüber Mix &amp; Go</div>
              <a href="#produkte" className="btn-primary w-full text-center !rounded-full">
                Fertig gemischt auswählen →
              </a>
            </article>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <div className="text-white font-bold text-xl">Der Pen bleibt derselbe.</div>
              <div className="text-blue-200/60 mt-1">Nur die Art der Patrone ändert sich.</div>
            </div>
            <a href={PEN_BUY_URL} target="_blank" rel="noopener noreferrer" className="btn-gold !rounded-full whitespace-nowrap">
              Pen kaufen · {loading ? "…" : `${penPrice} €`} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
