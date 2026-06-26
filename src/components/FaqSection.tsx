import { useState } from "react";

const faqs = [
  {
    q: "Was ist ein Peptidpen?",
    a: "Ein Peptidpen ist ein wiederverwendbares Pen-System, das speziell für die Verwendung mit fertig gemischten Peptid-Patronen entwickelt wurde. Der Pen ersetzt die klassische Insulinspritze und ermöglicht eine präzise, einfache Anwendung ohne vorherige Vorbereitung des Peptids.",
  },
  {
    q: "Was ist eine Plug&Play Patrone?",
    a: "Eine Plug&Play Patrone ist eine 3-ml-Glaspatrone, die bereits das rekonstituierte Peptid in der korrekten Konzentration enthält. Sie wird direkt in den Forschungspen eingesetzt — kein Mischen, kein Rechnen, keine Vorbereitung erforderlich.",
  },
  {
    q: "Wie unterscheidet sich die Patrone vom klassischen Vial?",
    a: "Beim klassischen Vial muss der Forscher das lyophilisierte Peptid selbst mit Bakteriostatischem Wasser rekonstituieren, die Konzentration berechnen und die Lösung in eine Spritze aufziehen. Die Patrone enthält bereits die fertige Lösung — der gesamte Vorbereitungsschritt entfällt.",
  },
  {
    q: "Welche Peptide sind als Patrone erhältlich?",
    a: "Alle patronenfähigen Peptide aus dem 369 Research Sortiment sind als Plug&Play Patrone erhältlich. Produkte, die sich aufgrund ihrer chemischen Eigenschaften nicht für die Patronenform eignen (z.B. nasale Peptide, Kapseln, Cremes), sind ausschließlich in ihrer Originalform erhältlich.",
  },
  {
    q: "Wie viel kostet der Forschungspen?",
    a: "Der Preis des Forschungspen wird dynamisch aus unserem Shop geladen und ist auf dieser Seite oben angezeigt. Es handelt sich um eine einmalige Investition — der Pen ist dauerhaft nutzbar und kompatibel mit allen 369 Research Patronen.",
  },
  {
    q: "Wie viel kostet eine Patrone mehr als das Standard-Vial?",
    a: "Der Aufpreis für die Plug&Play Patrone beträgt 15 € gegenüber dem Standard-Vial. Dieser Aufpreis deckt die Reinraum-Abfüllung, die pharmazeutische Primärverpackung und die Qualitätssicherung ab.",
  },
  {
    q: "Ist der Pen mit allen Patronen kompatibel?",
    a: "Der 369 Research Forschungspen ist ausschließlich mit den 369 Research Plug&Play Patronen kompatibel. Die Patronen haben ein standardisiertes 3-ml-Format und sind speziell für dieses Pen-System entwickelt.",
  },
  {
    q: "Wie lange ist eine Patrone nach Lieferung haltbar?",
    a: "Die Haltbarkeit hängt vom jeweiligen Peptid ab und ist auf der Produktseite angegeben. Alle Patronen werden unter Kühlkette geliefert und sollten entsprechend gelagert werden.",
  },
  {
    q: "Kann ich den Pen mehrfach verwenden?",
    a: "Ja, der Forschungspen ist für den dauerhaften Wiedergebrauch konzipiert. Nach Entleerung einer Patrone wird diese einfach durch eine neue ersetzt. Die Pen-Nadeln sollten nach jeder Anwendung gewechselt werden.",
  },
  {
    q: "Wie wird die Patrone in den Pen eingesetzt?",
    a: "Die Patrone wird in den Pen eingesetzt, indem der Pen geöffnet, die Patrone eingelegt und der Pen wieder verschlossen wird. Eine detaillierte Anleitung liegt jedem Pen bei. Der Vorgang dauert unter 30 Sekunden.",
  },
  {
    q: "Sind die Patronen für den menschlichen Gebrauch bestimmt?",
    a: "Nein. Alle Produkte von 369 Research, einschließlich der Plug&Play Patronen, sind ausschließlich für Forschungszwecke bestimmt (Research Use Only). Sie sind nicht zur menschlichen Anwendung vorgesehen.",
  },
  {
    q: "Wie werden die Patronen hergestellt?",
    a: "Die Patronen werden unter kontrollierten Reinraumbedingungen in Deutschland abgefüllt. Die verwendeten Glaspatronen entsprechen den Anforderungen an pharmazeutische Primärverpackungen und sind hermetisch versiegelt.",
  },
  {
    q: "Gibt es Analysezertifikate für die Produkte?",
    a: "Ja, für alle Produkte sind Analysezertifikate unabhängiger Labore verfügbar. Diese bestätigen Reinheit und Identität des jeweiligen Peptids. Die Zertifikate sind auf den jeweiligen Produktseiten im Shop einsehbar.",
  },
  {
    q: "Wie wird die Kühlkette sichergestellt?",
    a: "Alle temperatursensitiven Produkte werden mit Kühlakkus und isolierter Verpackung versandt. Die Kühlkette wird vom Produktionsstandort bis zur Lieferung lückenlos eingehalten.",
  },
  {
    q: "Kann ich verschiedene Peptide im selben Pen verwenden?",
    a: "Ja, der Pen kann mit verschiedenen Patronen verwendet werden. Es wird empfohlen, den Pen zwischen verschiedenen Peptiden zu reinigen. Patronen verschiedener Peptide sollten nicht gemischt werden.",
  },
  {
    q: "Wie bestelle ich?",
    a: "Alle Patronen können direkt über den 369 Research Shop auf 369research.eu bestellt werden. Klicke auf 'Als Patrone bestellen' bei dem gewünschten Produkt — du wirst direkt zur Produktseite weitergeleitet.",
  },
  {
    q: "Welche Zahlungsmethoden werden akzeptiert?",
    a: "Im 369 Research Shop werden Banküberweisung (SEPA und international via Wise) sowie Kreditkarte akzeptiert. Alle Zahlungsdetails werden beim Checkout angezeigt.",
  },
  {
    q: "Wie lange dauert die Lieferung?",
    a: "Die Lieferzeit beträgt in der Regel 2–4 Werktage innerhalb Deutschlands. Für EU-Lieferungen 3–7 Werktage. Alle Sendungen werden mit Tracking-Nummer verschickt.",
  },
  {
    q: "Gibt es einen Mindestbestellwert?",
    a: "Es gibt keinen Mindestbestellwert. Versandkostenfrei ab einem Bestellwert, der im Shop angezeigt wird.",
  },
  {
    q: "Wo kann ich den Forschungspen kaufen?",
    a: "Den Forschungspen gibt es ausschließlich im 369 Research Shop auf 369research.eu. Klicke auf 'Pen kaufen' oben auf dieser Seite, um direkt zur Produktseite zu gelangen.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-gray-50">
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
