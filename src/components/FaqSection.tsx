import { useState } from "react";

const faqs = [
  {
    q: "Was genau ist das 369 Pen-System?",
    a: "Das System besteht aus einem wiederverwendbaren Peptidpen und wechselbaren 3-ml-Patronen. Die Patrone enthält das gewählte Forschungsprodukt, während am Pen die benötigten Einheiten eingestellt werden.",
  },
  {
    q: "Wie funktioniert Mix & Go?",
    a: "Das gefriergetrocknete Produkt befindet sich bereits in der passenden Patrone. Du ergänzt BAC-Wasser, wartest bis sich das Produkt vollständig gelöst hat und setzt die vorbereitete Patrone in den Pen ein.",
  },
  {
    q: "Wie funktioniert Plug & Play?",
    a: "Die Patrone wird bereits fertig gemischt vorbereitet und gekühlt versendet. Nach Erhalt wird sie in den Pen eingesetzt; ein vorheriges Anmischen entfällt.",
  },
  {
    q: "Was ist beim Peptidpen für 49 € enthalten?",
    a: "Du erhältst den wiederverwendbaren 369 Research Peptidpen, das passende Case und 3 Pen-Nadeln. Die Produktpatrone wird separat ausgewählt.",
  },
  {
    q: "Brauche ich für jedes Produkt einen neuen Pen?",
    a: "Nein. Der Pen bleibt derselbe. Für ein anderes Produkt oder eine neue Stärke wird nur die passende Patrone gewechselt.",
  },
  {
    q: "Welche Produkte sind als Pen-Patrone erhältlich?",
    a: "Das Pen-System ist für passende injizierbare Forschungsprodukte vorgesehen. Nasale und orale Produkte, beispielsweise Semax oder Adamax, werden deshalb nicht als Pen-Patrone angezeigt.",
  },
  {
    q: "Braucht Mix & Go gekühlten Versand?",
    a: "Nein. Bei Mix & Go wird das Produkt als gefriergetrocknetes Pulver in der Patrone geliefert. Der gekühlte Versand gehört zur bereits fertig gemischten Plug-&-Play-Variante.",
  },
  {
    q: "Für wen sind die Produkte bestimmt?",
    a: "Alle Produkte sind ausschließlich für Forschungszwecke bestimmt (Research Use Only) und nicht zur menschlichen Anwendung vorgesehen.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="badge badge-blue mb-4">FAQ</span>
          <h2 className="section-title text-brand-dark mb-4">Kurz erklärt</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-150"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-brand-dark pr-4">{faq.q}</span>
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
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
