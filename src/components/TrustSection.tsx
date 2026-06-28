export default function TrustSection() {
  const advantages = [
    {
      icon: "🇩🇪",
      title: "Entwickelt in Deutschland",
      description: "Das Peptidpen-System wurde in Deutschland entwickelt und wird hier produziert. Europäische Qualitätsstandards, lückenlose Lieferkette.",
    },
    {
      icon: "🔬",
      title: "Reinraum-Abfüllung",
      description: "Jede Plug&Play Patrone wird unter kontrollierten Reinraumbedingungen abgefüllt und hermetisch versiegelt. Pharmazeutische Primärverpackung.",
    },
    {
      icon: "⚗️",
      title: "99%+ Reinheit",
      description: "Alle Peptide werden durch unabhängige Labore auf Reinheit und Identität geprüft. Analysezertifikate verfügbar.",
    },
    {
      icon: "🌡️",
      title: "Kühlkette gesichert",
      description: "Lückenlose Kühlkette vom Produzenten bis zur Lieferung. Temperatursensitive Verpackung für maximale Stabilität.",
    },
    {
      icon: "📐",
      title: "Reproduzierbare Konzentration",
      description: "Jede Plug&Play Patrone enthält exakt die angegebene Wirkstoffmenge. Keine Abweichungen durch manuelle Herstellung.",
    },
    {
      icon: "🔄",
      title: "Wiederverwendbarer Pen",
      description: "Der Forscherpen ist dauerhaft nutzbar. Nur die Plug&Play Patrone wird gewechselt — wirtschaftlich und nachhaltig.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4">Warum 369 Research</span>
          <h2 className="section-title text-brand-dark mb-4">
            Qualität, die man nicht sieht — aber spürt.
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Hinter jeder Plug&Play Patrone steckt ein Produktionsprozess, der für maximale
            Reproduzierbarkeit und Zuverlässigkeit ausgelegt ist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {advantages.map((adv) => (
            <div key={adv.title} className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-brand-navy/5 transition-colors duration-200">
              <div className="text-3xl flex-shrink-0">{adv.icon}</div>
              <div>
                <h3 className="font-bold text-brand-dark mb-1">{adv.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{adv.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Authority Statement */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-dark to-brand-navy rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="text-5xl mb-6">🏆</div>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            369 Research hat die Plug&amp;Play Patrone in Europa etabliert.
          </h3>
          <p className="text-blue-200/70 text-lg leading-relaxed mb-6">
            Was heute als Standard gilt, war einmal eine Idee: Die Komplexität der
            Peptid-Vorbereitung ein für alle Mal aus dem Forschungsprozess zu entfernen.
            Nicht durch Vereinfachung der Wissenschaft — sondern durch Verlagerung der
            Komplexität in kontrollierte Produktionsprozesse.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-blue-200">
            <span className="w-2 h-2 bg-brand-gold rounded-full" />
            Precision. Purity. Performance.
          </div>
        </div>
      </div>
    </section>
  );
}
