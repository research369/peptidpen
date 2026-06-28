import { useProducts } from "../hooks/useProducts";
import { PEN_BUY_URL, config } from "../lib/config";

// Fallback-Werte wenn API nicht antwortet
const FALLBACK_PEN_PRICE = 39;

// CDN-Bild: Pen-Aufbau-Infografik
const PEN_AUFBAU_IMG =
  "https://files.manuscdn.com/user_upload_by_module/session_file/119871539/SXkIterLKvAtviMJ.png";

export default function PenSystemBanner() {
  const { penProduct, loading } = useProducts();

  const penPrice = penProduct?.price ?? (loading ? null : FALLBACK_PEN_PRICE);
  const surcharge = config.plugplaySurcharge ?? 15;

  return (
    <section className="section-darker py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="badge badge-gold mb-4">Das System verstehen</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Einmal investieren. Immer profitieren.
            </h2>
            <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
              Das Peptidpen-System besteht aus zwei Komponenten — und das ist der Schlüssel
              zur maximalen Wirtschaftlichkeit.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Pen */}
            <div className="card-glass relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge bg-brand-gold/20 text-brand-gold text-xs">Einmalig</span>
              </div>
              <div className="text-5xl mb-4">🖊️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Der Forscherpen</h3>
              <p className="text-blue-200/70 mb-6 leading-relaxed">
                Der wiederverwendbare Pen ist die Basis des Systems. Einmal angeschafft,
                hält er dauerhaft. Kompatibel mit allen 369 Research Patronen.
              </p>
              <div className="flex items-end gap-2 mb-6">
                {loading ? (
                  <div className="h-10 w-24 bg-white/10 rounded animate-pulse" />
                ) : penPrice !== null ? (
                  <>
                    <span className="text-4xl font-bold text-white">{penPrice} €</span>
                    <span className="text-blue-200/50 text-sm mb-1">einmalig</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-white">Preis auf Anfrage</span>
                )}
              </div>
              {/* CTA — immer sichtbar, auch wenn API fehlschlägt */}
              <a
                href={PEN_BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-center"
              >
                Pen jetzt kaufen →
              </a>
            </div>

            {/* Patronen */}
            <div className="card-glass relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge bg-brand-blue/30 text-blue-300 text-xs">Wiederkehrend</span>
              </div>
              <div className="text-5xl mb-4">💊</div>
              <h3 className="text-2xl font-bold text-white mb-2">Die Peptid-Patronen</h3>
              <p className="text-blue-200/70 mb-6 leading-relaxed">
                Fertig gemischte 3-ml-Patronen, kompatibel mit dem Forscherpen.
                Einfach einsetzen — kein Mischen, kein Rechnen, kein Aufwand.
                Aufpreis gegenüber dem Standard-Vial:
              </p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold text-brand-gold">+{surcharge} €</span>
                <span className="text-blue-200/50 text-sm mb-1">pro Patrone</span>
              </div>
              <a
                href="#produkte"
                className="btn-primary w-full text-center"
              >
                Alle Patronen ansehen →
              </a>
            </div>
          </div>

          {/* Pen-Aufbau Infografik */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white">So ist der Pen aufgebaut</h3>
              <p className="text-blue-200/60 text-sm mt-2">
                Präzisionsmechanik für zuverlässige Forschungsergebnisse
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl">
              <img
                src={PEN_AUFBAU_IMG}
                alt="Aufbau des Forscherpen — Infografik"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-gold mb-1">
                  {loading ? "—" : penPrice !== null ? `${penPrice} €` : `${FALLBACK_PEN_PRICE} €`}
                </div>
                <div className="text-white font-medium">Einmalige Investition</div>
                <div className="text-blue-200/50 text-sm mt-1">Forscherpen (dauerhaft)</div>
              </div>
              <div className="flex items-center justify-center text-4xl text-white/30">+</div>
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-1">+{surcharge} €</div>
                <div className="text-white font-medium">Pro Patrone</div>
                <div className="text-blue-200/50 text-sm mt-1">Aufpreis auf Produktpreis</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-blue-200/70 text-sm">
                <strong className="text-white">Research Use Only.</strong> Alle Produkte ausschließlich für Forschungszwecke.
                Nicht zur menschlichen Anwendung bestimmt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
