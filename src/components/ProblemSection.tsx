export default function ProblemSection() {
  const problems = [
    {
      icon: "⚗️",
      title: "Mischen mit Bakteriostatischem Wasser",
      description: "Jedes Mal neu ansetzen. Jedes Mal das Risiko einer Kontamination. Jedes Mal die Frage: Habe ich die richtige Menge verwendet?",
    },
    {
      icon: "🧮",
      title: "Dosierungsberechnungen",
      description: "Konzentration, Volumen, Einheiten — ein kleiner Rechenfehler und die gesamte Charge ist unbrauchbar oder falsch dosiert.",
    },
    {
      icon: "💉",
      title: "Mehrfaches Umfüllen",
      description: "Vom Lyophilisat ins Wasser, dann in die Spritze. Jeder Schritt ist ein Kontaminationsrisiko. Jeder Schritt kostet Zeit.",
    },
    {
      icon: "🌡️",
      title: "Stabilitätsprobleme",
      description: "Einmal rekonstituiert, beginnt der Abbau. Falsche Lagerung, falsche Temperatur — und die Forschungsqualität leidet.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Problem */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge badge-blue mb-4">Das Problem</span>
          <h2 className="section-title text-brand-dark mb-4">
            Peptid-Forschung war unnötig kompliziert.
          </h2>
          <p className="text-lg text-gray-500">
            Jeder der mit Peptiden arbeitet kennt das: Bevor die eigentliche Forschung beginnt,
            folgt ein aufwendiges Ritual aus Mischen, Rechnen und Hoffen, dass alles korrekt war.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {problems.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-bold text-brand-dark text-lg mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Agitation */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            Das Ergebnis: Wertvolle Forschungszeit geht verloren. Ergebnisse werden durch
            menschliche Fehler verfälscht. Und der Einstieg in die Peptid-Forschung bleibt
            unnötig schwer.
          </p>
        </div>

        {/* Solution Bridge */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-brand-navy to-brand-blue rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Die Lösung: Komplexität verlagern, nicht vereinfachen.
          </h3>
          <p className="text-blue-200 text-lg leading-relaxed">
            Statt den Forscher mit der Komplexität allein zu lassen, haben wir sie in unsere
            kontrollierten Produktionsprozesse verlagert. Das Ergebnis ist eine Patrone,
            die bereits alles enthält — präzise dosiert, unter Reinraumbedingungen abgefüllt,
            versiegelt und sofort einsatzbereit.
          </p>
        </div>
      </div>
    </section>
  );
}
