import { DISCOUNT_TIERS } from "../lib/commerceRules";

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
            {DISCOUNT_TIERS.map((item) => (
              <div className="discount-tier" key={item.quantity}>
                <strong>−{item.percent}%</strong>
                <span>AB {item.quantity} STÜCK</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
