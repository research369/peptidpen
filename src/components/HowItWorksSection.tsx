export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: "🖊️",
      title: "Pen einmalig kaufen",
      description: "Der wiederverwendbare Forschungspen ist die Basis. Einmal angeschafft, hält er dauerhaft und ist mit allen 369 Research Patronen kompatibel.",
      cta: null,
    },
    {
      step: "02",
      icon: "📦",
      title: "Patrone wählen & bestellen",
      description: "Wähle aus unserem Sortiment patronenfähiger Peptide. Jede Patrone ist fertig gemischt, präzise dosiert und versiegelt geliefert.",
      cta: { label: "Zum Sortiment", href: "#produkte" },
    },
    {
      step: "03",
      icon: "⚡",
      title: "Einsetzen & sofort forschen",
      description: "Patrone in den Pen einsetzen. Fertig. Keine Vorbereitung, kein Mischen, kein Warten. Unter 60 Sekunden vom Paket zur Anwendung.",
      cta: null,
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
                  <a href={step.cta.href} className="text-brand-blue font-semibold text-sm hover:underline">
                    {step.cta.label} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-20 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
}
