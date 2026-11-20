const steps = [
  ["01", "PATRONE WÄHLEN", "Forschungsprodukt und verfügbare Stärke direkt auf peptidpen.de auswählen."],
  ["02", "IM HAUPTSHOP PRÜFEN", "Du landest auf der passenden Produktseite von 369 Research. Preis, Bestand und Mengenrabatt kommen aus dem bestehenden Shopsystem."],
  ["03", "SICHER ABSCHLIESSEN", "Warenkorb und Checkout laufen vollständig über 369research.eu. Bei Banküberweisung werden die bunq-Zahlungsdaten im Bestellablauf angezeigt."],
];

export default function CheckoutSection() {
  return (
    <section className="checkout-section">
      <div className="container mx-auto px-4">
        <div className="checkout-intro">
          <div className="staging-kicker staging-kicker-light">BESTELLUNG &amp; ZAHLUNG</div>
          <h2>DEINE AUSWAHL.<br /><span>DER BESTEHENDE 369 CHECKOUT.</span></h2>
          <p>peptidpen.de erklärt und filtert. Bestellung, Zahlung, Lagerabzug und Versand bleiben vollständig im bewährten 369 Research Shop.</p>
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
