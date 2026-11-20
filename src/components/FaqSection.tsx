import { useState } from "react";

const faqs = [
  {
    q: "Was ist eine 369 Plug&Play Patrone?",
    a: "Eine austauschbare Doppelkammerpatrone für den 369 Peptid-Pen. Das lyophilisierte Forschungsprodukt und das BAC-Wasser befinden sich bis zur Aktivierung getrennt in zwei Kammern.",
  },
  {
    q: "Wie wird die Patrone aktiviert?",
    a: "Durch einen Klick wird die Verbindung zwischen den Kammern geöffnet. Das BAC-Wasser gelangt zum Forschungsprodukt und beides wird direkt in der Patrone vermischt.",
  },
  {
    q: "Werden die Patronen fertig gemischt geliefert?",
    a: "Nein. Forschungsprodukt und BAC-Wasser bleiben während Lagerung und Versand getrennt. Die Vermischung erfolgt erst bei der Aktivierung der Doppelkammerpatrone.",
  },
  {
    q: "Ist gekühlter Versand notwendig?",
    a: "Nein. Da der Inhalt erst bei der Aktivierung gemischt wird, ist für den Versand der ungeöffneten Plug&Play Doppelkammerpatrone keine Kühlkette erforderlich.",
  },
  {
    q: "Was enthält das Peptid-Pen Set für 49 €?",
    a: "Den wiederverwendbaren 369 Peptid-Pen, das neue Case und drei Pen-Nadeln. Die gewünschte Plug&Play Patrone wird separat ausgewählt.",
  },
  {
    q: "Gibt es einen Aufpreis für das Patronenformat?",
    a: "Nein. Jede 369 Plug&Play Patrone hat einen eigenen festen Preis. Es gibt keinen pauschalen Aufpreis auf einen Vial-Preis.",
  },
  {
    q: "Welche Produkte sind als Patrone erhältlich?",
    a: "Passende injizierbare Forschungsprodukte. Nasale oder orale Produkte wie Semax und Adamax werden nicht als Plug&Play Patrone angeboten.",
  },
  {
    q: "Gelten die Mengenrabatte auch für Patronen?",
    a: "Ja. Der Mengenrabatt gilt für den gesamten Warenkorb: 20 % ab 5 Stück, 25 % ab 10 Stück und 35 % ab 20 Stück. Er ist nicht mit anderen Rabatten kombinierbar.",
  },
  {
    q: "Wie funktionieren Bestellung und Banküberweisung?",
    a: "Die ausgewählte Patrone wird im bestehenden 369 Research Shop bestellt. Der Checkout zeigt die verfügbaren Zahlungsarten; bei Banküberweisung werden dort die bunq-Zahlungsdaten für die Bestellung angezeigt.",
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
