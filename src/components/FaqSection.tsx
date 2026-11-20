import { useState } from "react";

const faqs = [
  {
    q: "Was ist eine 369 Plug&Play Patrone?",
    a: "Die 369 Plug&Play Patrone enthält Pulver und BAC-Wasser in zwei getrennten Kammern. Ein Klick verbindet beide Inhalte direkt in der Glaspatrone.",
  },
  {
    q: "Wie wird die Patrone aktiviert?",
    a: "Durch einen Klick wird die Verbindung zwischen den Kammern geöffnet. Das BAC-Wasser gelangt zum Forschungsprodukt und beides wird direkt in der Patrone vermischt.",
  },
  {
    q: "Was enthält das Peptid-Pen Set für 49 €?",
    a: "Den wiederverwendbaren 369 Peptid-Pen, das Case und drei Pen-Nadeln. Die 369 Plug&Play Patrone wählst du separat aus.",
  },
  {
    q: "Kann ich den Pen wiederverwenden?",
    a: "Ja. Du behältst den 369 Peptid-Pen und wechselst die 369 Plug&Play Patrone.",
  },
  {
    q: "Gelten die Mengenrabatte auch für Patronen?",
    a: "20 % ab 5 Stück, 25 % ab 10 Stück und 35 % ab 20 Stück.",
  },
  {
    q: "Wie funktionieren Bestellung und Banküberweisung?",
    a: "Du bestellst bei 369 Research. Bei Banküberweisung erhältst du im Bestellablauf die Bankverbindung und den Verwendungszweck.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-lab-section" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="staging-kicker">HÄUFIGE FRAGEN</span>
          <h2 className="staging-heading">PLUG&amp;PLAY.<br /><span>KLAR ERKLÄRT.</span></h2>
        </div>
        <div className="max-w-4xl mx-auto faq-grid">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.q}</span><b>{openIndex === index ? "−" : "+"}</b>
              </button>
              {openIndex === index && <p>{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
