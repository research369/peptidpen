import { getShopProductUrl } from "../lib/config";

const FALLBACK_PEN_ID = "forscherpen";

// CDN-Bilder für How-It-Works
const SO_FUNKTIONIERTS_IMG =
  "https://files.manuscdn.com/user_upload_by_module/session_file/119871539/oyLBgpehxtqfEmgs.png";
const FUER_JEDES_PRODUKT_IMG =
  "https://files.manuscdn.com/user_upload_by_module/session_file/119871539/nOQBLJJPFwDneuaJ.png";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: "🖊️",
      title: "Pen einmalig kaufen",
      description: "Der wiederverwendbare Forschungspen ist die Basis. Einmal angeschafft, hält er dauerhaft und ist mit allen 369 Research Patronen kompatibel.",
      cta: { label: "Pen kaufen — 39 €", href: getShopProductUrl(FALLBACK_PEN_ID), external: true },
    },
    {
      step: "02",
      icon: "📦",
      title: "Patrone wählen & bestellen",
      description: "Wähle aus unserem Sortiment patronenfähiger Peptide. Jede Patrone ist fertig gemischt, präzise dosiert und versiegelt geliefert.",
      cta: { label: "Zum Sortiment →", href: "#produkte", external: false },
    },
    {
      step: "03",
      icon: "⚡",
      title: "Einsetzen & sofort forschen",
      description: "Patrone in den Pen einsetzen. Fertig. Keine Vorbereitung, kein Mischen, kein Warten. Unter 60 Sekunden vom Paket zur Anwendung.",
      cta: { label: "Jetzt bestellen →", href: "#produkte", external: false },
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4">So einfach geht's</span>
          <h2 className="section-title text-brand-dark mb-4">
            Drei Schritte. Das war's.
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Das Peptidpen-System wurde entwickelt, um den Weg von der Bestellung zur
            Forschung so kurz wie möglich zu machen.
          </p>
        </div>

        {/* Bild: So funktioniert's */}
        <div className="max-w-3xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-md">
          <img
            src={SO_FUNKTIONIERTS_IMG}
            alt="So funktioniert das Peptidpen-System"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-brand-blue/30 to-transparent z-0 -translate-y-1/2" />
              )}

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-navy text-4xl mb-6 shadow-lg shadow-brand-navy/20">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">
                  Schritt {step.step}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.description}</p>
                {step.cta && (
                  step.cta.external ? (
                    <a href={step.cta.href} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 btn-gold text-sm px-5 py-2">
                      {step.cta.label}
                    </a>
                  ) : (
                    <a href={step.cta.href} className="inline-block mt-2 btn-primary text-sm px-5 py-2">
                      {step.cta.label}
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bild: Für jedes Produkt */}
        <div className="max-w-4xl mx-auto mt-16 mb-4 rounded-2xl overflow-hidden shadow-md">
          <img
            src={FUER_JEDES_PRODUKT_IMG}
            alt="Für jedes Peptid-Produkt die passende Patrone"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-brand-dark text-center mb-8">
            Klassisch vs. Peptidpen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Klassisch */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="font-bold text-red-700 mb-4 flex items-center gap-2">
                <span className="text-xl">❌</span> Klassische Methode
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Lyophilisat + BAC-Wasser separat kaufen",
                  "Dosierung manuell berechnen",
                  "Unter Reinraumbedingungen mischen",
                  "Auf vollständige Auflösung warten",
                  "In Spritze aufziehen",
                  "Risiko: Kontamination, Fehldosierung",
                  "Zeitaufwand: 5–15 Minuten",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Peptidpen */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <div className="font-bold text-green-700 mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span> Mit dem Peptidpen
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Patrone einsetzen — fertig",
                  "Dosierung bereits korrekt eingestellt",
                  "Unter Reinraumbedingungen abgefüllt",
                  "Sofort einsatzbereit",
                  "Pen-Nadel aufsetzen, anwenden",
                  "Strukturell fehlerfreie Anwendung",
                  "Zeitaufwand: unter 60 Sekunden",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getShopProductUrl(FALLBACK_PEN_ID)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-lg px-10 py-4"
            >
              Pen kaufen — 39 € →
            </a>
            <a
              href="#produkte"
              className="btn-primary text-lg px-10 py-4"
            >
              Patronen entdecken →
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">❄️ Gekühlter Versand · Lieferung innerhalb 48h · Über 1.000 Kunden</p>
        </div>
      </div>
    </section>
  );
}
