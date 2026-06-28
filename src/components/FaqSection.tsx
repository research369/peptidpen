import { useState } from "react";

const faqs = [
  {
    q: "Was ist eine Plug&Play Patrone?",
    a: "Die Plug&Play Patrone ist eine fertig gemischte 3-ml-Glaspatrone mit einem Peptid in optimaler Konzentration — direkt einsatzbereit, ohne Mischen, ohne Rechnen, ohne Fehler. Einfach in den Forscherpen einsetzen und sofort anwenden. Kein Bacteriostatic Water, keine Spritzen zum Mischen, kein Aufwand. Die Patrone ist kompatibel ausschließlich mit dem 369 Research Forscherpen.",
  },
  {
    q: "Was ist der Peptidpen?",
    a: "Der Peptidpen (offiziell: 369 Research Forscherpen) ist ein wiederverwendbarer, präzisionsgefertigter Injektionspen speziell für Peptid-Patronen. Er ist kompatibel mit allen 369 Research Plug&Play Patronen und ermöglicht eine reproduzierbare, präzise Dosierung ohne die übliche Vorbereitung mit Vials, Spritzen und Bacteriostatic Water.",
  },
  {
    q: "Kann ich den Peptidpen wiederverwenden?",
    a: "Ja — der Forscherpen ist vollständig wiederverwendbar. Er wurde für den dauerhaften Einsatz konzipiert. Nach Verbrauch einer Patrone wird diese einfach ausgetauscht und eine neue Plug&Play Patrone eingesetzt. Der Pen selbst ist langlebig und muss nur einmalig erworben werden.",
  },
  {
    q: "Kann ich die Plug&Play Patrone wiederverwenden?",
    a: "Nein — die Patronen sind Einwegprodukte und für den einmaligen Gebrauch bestimmt. Jede Patrone enthält eine definierte Menge eines Peptids in fertiger Lösung. Nach vollständiger Verwendung wird die leere Patrone entsorgt und durch eine neue ersetzt.",
  },
  {
    q: "Wie läuft der gekühlte Versand ab?",
    a: "Alle Bestellungen werden versichert über DHL in professionellen Styropor-Thermoboxen mit über 3 cm Wandstärke versendet. Die Boxen sind mit mehreren ICE Packs gefüllt und befinden sich zusätzlich in einem stabilen Außenkarton — so bleibt die Kühlkette auch bei längeren Lieferzeiten oder Sommerhitze zuverlässig erhalten. Die Lieferzeit beträgt 2–3 Werktage nach Bestellung.",
  },
  {
    q: "Wie kann ich bezahlen?",
    a: "Folgende Zahlungsmethoden werden akzeptiert: Banküberweisung (SEPA, innerhalb Deutschlands und der EU), Sofortüberweisung, Kreditkarte (bis 500 €), Kryptowährungen sowie internationale Überweisungen via Wise (außerhalb SEPA). Alle Zahlungsdetails werden beim Checkout angezeigt.",
  },
  {
    q: "Für wen sind die Produkte bestimmt?",
    a: "Alle Produkte von 369 Research sind ausschließlich für Forschungszwecke bestimmt (Research Use Only / RUO). Sie sind nicht zur menschlichen Anwendung vorgesehen. Der Kauf setzt voraus, dass du volljährig bist und die Produkte ausschließlich zu Forschungszwecken verwendest.",
  },
  {
    q: "Wie bestelle ich eine Plug&Play Patrone?",
    a: "Alle Patronen sind direkt im 369 Research Shop auf 369research.eu erhältlich. Wähle dein gewünschtes Peptid auf dieser Seite aus und klicke auf 'Als Patrone bestellen' — du wirst direkt zur Produktseite weitergeleitet.",
  },
  {
    q: "Wo kann ich den Forscherpen kaufen?",
    a: "Den Forscherpen gibt es ausschließlich im 369 Research Shop. Klicke auf den 'Pen kaufen' Button oben auf dieser Seite — du wirst direkt zur Plug&Play Seite weitergeleitet.",
  },

  {
    q: "Kann ich verschiedene Peptide im selben Pen verwenden?",
    a: "Ja, der Pen ist mit allen 369 Research Plug&Play Patronen kompatibel. Patronen können gewechselt werden. Es wird empfohlen, den Pen zwischen verschiedenen Peptiden zu reinigen. Patronen verschiedener Peptide sollten nicht gemischt oder kombiniert werden.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4">FAQ</span>
          <h2 className="section-title text-brand-dark mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Alles was du über den Peptidpen und die Plug&amp;Play Patronen wissen musst.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-150"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-brand-dark pr-4">{faq.q}</span>
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
