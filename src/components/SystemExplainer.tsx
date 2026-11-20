const steps = [
  {
    image: "/assets/plugplay-doppelkammer.webp",
    eyebrow: "GETRENNT GELAGERT",
    title: "ZWEI KAMMERN. EINE PATRONE.",
    text: "Das lyophilisierte Forschungsprodukt und das BAC-Wasser befinden sich getrennt in der 369 Plug&Play Patrone.",
  },
  {
    image: "/assets/plugplay-mechanik.webp",
    eyebrow: "MIT EINEM KLICK",
    title: "VERBINDEN UND AKTIVIEREN.",
    text: "Der Klick öffnet die Verbindung zwischen beiden Kammern. Das BAC-Wasser gelangt direkt zum Forschungsprodukt.",
  },
  {
    image: "/assets/plugplay-aktiviert.webp",
    eyebrow: "DIREKT IN DER PATRONE",
    title: "MISCHEN. EINSETZEN. FORSCHEN.",
    text: "Nach vollständiger Vermischung wird die Patrone in den wiederverwendbaren 369 Peptid-Pen eingesetzt.",
  },
];

export default function SystemExplainer() {
  return (
    <section id="system" className="system-section">
      <div className="container mx-auto px-4">
        <div className="system-intro">
          <div className="staging-kicker">DAS EINZIGARTIGE SYSTEM</div>
          <h2 className="staging-heading">EIN KLICK.<br /><span>DIREKT GEMISCHT.</span></h2>
          <p>
            Keine fertig gemischte Patrone und keine Kühlkette: Die zwei Kammern halten
            Forschungsprodukt und BAC-Wasser bis zur Aktivierung voneinander getrennt.
          </p>
        </div>

        <div className="mechanism-grid">
          {steps.map((step, index) => (
            <article className="mechanism-card" key={step.title}>
              <div className="mechanism-number">0{index + 1}</div>
              <img src={step.image} alt={step.title} loading="lazy" />
              <div className="mechanism-copy">
                <span>{step.eyebrow}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
