import { useState } from "react";

const faqs = [
  {
    q: "Was ist der Unterschied zwischen Mix & Go und fertig gemischt?",
    a: "Bei Mix & Go mischst du die Patrone selbst an. Die fertig gemischte Patrone wird vorbereitet geliefert und kann direkt in den Pen eingesetzt werden.",
  },
  {
    q: "Brauche ich für beide Optionen denselben Pen?",
    a: "Ja. Der 369 Research Pen ist wiederverwendbar. Du wechselst nur die passende Patrone.",
  },
  {
    q: "Was brauche ich zum Start?",
    a: "Du brauchst den wiederverwendbaren Pen und eine passende Patrone. Beim Produkt wählst du Mix & Go oder fertig gemischt.",
  },
  {
    q: "Wie wähle ich Produkt, Stärke und Patronen-Art?",
    a: "Wähle auf dieser Seite zuerst das Produkt. Im 369 Research Shop wählst du danach die verfügbare Stärke und die gewünschte Patronen-Art.",
  },
  {
    q: "Kann ich später zwischen den beiden Optionen wechseln?",
    a: "Ja. Der Pen bleibt derselbe. Bei jeder neuen Bestellung kannst du erneut zwischen Mix & Go und fertig gemischt wählen.",
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
