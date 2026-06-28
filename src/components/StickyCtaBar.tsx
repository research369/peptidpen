import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { getShopProductUrl } from "../lib/config";

export default function StickyCtaBar() {
  const [dismissed, setDismissed] = useState(false);
  const { penProduct } = useProducts();

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-navy border-t border-brand-blue/30 shadow-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl flex-shrink-0">💊</span>
            <div className="min-w-0">
              <div className="text-white font-semibold text-sm truncate">
                Plug&Play Patronen — fertig gemischt, sofort einsatzbereit
              </div>
              <div className="text-blue-300/70 text-xs hidden sm:block">
                Research Use Only · Entwickelt in Deutschland
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="#produkte"
              className="btn-primary text-sm py-2 px-4 whitespace-nowrap"
              onClick={() => {
                // Smooth scroll to products
                document.getElementById("produkte")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Plug&Play Patronen ansehen
            </a>
            {penProduct && (
              <a
                href={getShopProductUrl(penProduct.shopProductId)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex btn-gold text-sm py-2 px-4 whitespace-nowrap"
              >
                Pen kaufen
              </a>
            )}
            <button
              onClick={() => setDismissed(true)}
              className="text-white/40 hover:text-white/80 transition-colors p-1"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
