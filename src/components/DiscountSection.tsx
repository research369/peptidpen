const discounts = [
  { quantity: "5", discount: "−20%" },
  { quantity: "10", discount: "−25%" },
  { quantity: "20", discount: "−35%" },
];

export default function DiscountSection() {
  return (
    <section id="rabatte" className="discount-section" aria-labelledby="discount-title">
      <div className="container mx-auto px-4">
        <div className="discount-grid">
          <div>
            <div className="staging-kicker">MENGENRABATT</div>
            <h2 id="discount-title" className="staging-heading">
              MEHR PATRONEN.<br /><span>MEHR RABATT.</span>
            </h2>
          </div>
          <div className="discount-tiers">
            {discounts.map((item) => (
              <div className="discount-tier" key={item.quantity}>
                <strong>{item.discount}</strong>
                <span>AB {item.quantity} STÜCK</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
