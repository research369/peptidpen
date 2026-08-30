const parts = [
  {
    number: "01",
    title: "Der wiederverwendbare Pen",
    text: "Der Pen nimmt die passende 3-ml-Patrone auf. Über das Einstellrad werden die gewünschten Einheiten reproduzierbar eingestellt.",
  },
  {
    number: "02",
    title: "Die wechselbare Patrone",
    text: "Das gewählte Forschungsprodukt befindet sich direkt in der Patrone. Ist sie leer, wird nur die Patrone gewechselt – der Pen bleibt.",
  },
  {
    number: "03",
    title: "Eine klare Einheitenskala",
    text: "Statt Flüssigkeit jedes Mal mit einer separaten Spritze aufzuziehen, wird die vorgesehene Menge direkt am Pen eingestellt.",
  },
];

const steps = [
  ["Produkt wählen", "Passendes Forschungsprodukt und verfügbare Stärke auswählen."],
  ["Patrone wählen", "Mix & Go selbst vorbereiten oder Plug & Play fertig gemischt erhalten."],
  ["Patrone einsetzen", "Die vorbereitete Patrone in den wiederverwendbaren Pen einsetzen."],
  ["Einheiten einstellen", "Gewünschte Einheit am Einstellrad wählen – fertig für den Forschungsablauf."],
];

export default function SystemExplainer() {
  return (
    <section id="system" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="molecule-field molecule-field-left !top-10 !opacity-10" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge badge-blue mb-4">Ohne Fachchinesisch</span>
          <h2 className="section-title text-brand-dark mb-4">Was ist das 369 Pen-System?</h2>
          <p className="section-subtitle mx-auto text-center">
            Ein wiederverwendbarer Pen und wechselbare Patronen für passende Forschungsprodukte.
            Der Pen übernimmt das Einstellen der Einheiten, die Patrone enthält das Produkt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16">
          {parts.map((part) => (
            <article key={part.number} className="system-part-card">
              <span>{part.number}</span>
              <h3>{part.title}</h3>
              <p>{part.text}</p>
            </article>
          ))}
        </div>

        <div className="max-w-6xl mx-auto rounded-[2rem] bg-[#061d50] p-6 md:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <div className="text-[#7fc8ff] text-xs font-black uppercase tracking-[.16em]">So funktioniert es</div>
              <h3 className="text-white text-2xl md:text-3xl font-bold mt-2">In vier Schritten zur passenden Pen-Patrone</h3>
            </div>
            <a href="#produkte" className="btn-gold !rounded-full whitespace-nowrap">Produkt auswählen →</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map(([title, text], index) => (
              <div key={title} className="system-step-card">
                <b>{index + 1}</b>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
