const steps = [
  ["01", "AUSWÄHLEN", "Wähle dein Produkt und die gewünschte Stärke."],
  ["02", "BESTELLEN", "Lege deine Auswahl bei 369 Research in den Warenkorb."],
  ["03", "BEZAHLEN", "Bei Banküberweisung erhältst du die Bankverbindung und den Verwendungszweck im Bestellablauf."],
];

export default function CheckoutSection() {
  return (
    <section className="checkout-section">
      <div className="container mx-auto px-4">
        <div className="checkout-intro">
          <div className="staging-kicker staging-kicker-light">BESTELLUNG &amp; ZAHLUNG</div>
          <h2>IN WENIGEN SCHRITTEN<br /><span>ZU DEINER BESTELLUNG.</span></h2>
        </div>
        <div className="checkout-steps">
          {steps.map(([number, title, text]) => (
            <article key={number}>
              <b>{number}</b><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
