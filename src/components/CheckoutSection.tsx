const steps = [
  ["01", "PRODUKT WÄHLEN", "Wähle dein Produkt und die gewünschte Stärke. Noch keinen Pen? Nimm einmalig den 369 Pen dazu."],
  ["02", "BESTELLEN", "Lege deine Auswahl in den Warenkorb und schließe deine Bestellung ab."],
  ["03", "EINSETZEN", "Setze die 369 Plug&Play Patrone in deinen 369 Pen ein."],
  ["04", "KLICKEN. FERTIG.", "Ein Klick verbindet Pulver und BAC-Wasser direkt in der Patrone."],
];

export default function CheckoutSection() {
  return (
    <section className="checkout-section">
      <div className="container mx-auto px-4">
        <div className="checkout-intro">
          <h2>WÄHLEN. EINSETZEN.<br /><span>KLICKEN. FERTIG.</span></h2>
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
