import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { getShopProductUrl, config } from "../lib/config";
import type { ShopProduct } from "../lib/api";

type CartridgeMode = "mixgo" | "plugplay";

function ProductCard({ product, mode }: { product: ShopProduct; mode: CartridgeMode }) {
  const mixAndGoPrice = product.variants && product.variants.length > 0
    ? Math.min(...product.variants.map((variant) => variant.price))
    : product.price;
  const readyMixedPrice = mixAndGoPrice + config.plugplaySurcharge;
  const hasVariants = product.variants && product.variants.length > 1;

  return (
    <article className="product-card group">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-white via-[#f4f9ff] to-[#e8f4ff] overflow-hidden border-b border-blue-100">
        {(product.image || product.mockupImage) ? (
          <img
            src={product.image || product.mockupImage || ""}
            alt={product.name}
            className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(event) => {
              const fallback = product.mockupImage;
              if (fallback && event.currentTarget.src !== fallback) {
                event.currentTarget.src = fallback;
              } else {
                event.currentTarget.style.display = "none";
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#0a64c7] text-4xl font-black">369</div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge bg-brand-blue text-white text-xs shadow-md">Zwei Patronen-Optionen</span>
        </div>
        {product.purity && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-green-100 text-green-700 text-xs">{product.purity} Reinheit</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs text-brand-blue font-semibold uppercase tracking-wide mb-1">
          {product.categories.filter((category) => category !== "Zubehör").slice(0, 2).join(" · ")}
        </div>
        <h3 className="font-bold text-brand-dark text-lg mb-3 leading-tight">{product.name}</h3>

        {hasVariants && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.variants!.slice(0, 4).map((variant) => (
              <span key={variant.label} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{variant.label}</span>
            ))}
            {product.variants!.length > 4 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                +{product.variants!.length - 4} weitere
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`rounded-xl border p-3 ${mode === "mixgo" ? "border-[#0878ee] bg-blue-50 ring-2 ring-blue-100" : "border-blue-100 bg-white"}`}>
            <span className="block text-xs font-bold text-[#0a64c7]">Mix &amp; Go {mode === "mixgo" && "· gewählt"}</span>
            <strong className="block mt-1 text-lg text-[#062a68]">ab {mixAndGoPrice} €</strong>
          </div>
          <div className={`rounded-xl border p-3 ${mode === "plugplay" ? "border-[#0878ee] bg-blue-50 ring-2 ring-blue-100" : "border-blue-100 bg-white"}`}>
            <span className="block text-xs font-bold text-[#0a64c7]">Plug &amp; Play {mode === "plugplay" && "· gewählt"}</span>
            <strong className="block mt-1 text-lg text-[#062a68]">ab {readyMixedPrice} €</strong>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-400"}`} />
          <span className="text-xs text-gray-500">{product.inStock ? "Auf Lager" : "Derzeit nicht verfügbar"}</span>
        </div>

        <a
          href={getShopProductUrl(product.shopProductId)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-primary w-full text-center text-sm py-3 !rounded-full ${!product.inStock ? "opacity-60 pointer-events-none" : ""}`}
        >
          Im 369 Research Shop öffnen →
        </a>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [mode, setMode] = useState<CartridgeMode>("mixgo");

  const categories = ["Alle", ...Array.from(
    new Set(products.flatMap((product) =>
      product.categories.filter((category) => category !== "Zubehör" && category !== "369 BeautyLine")
    ))
  ).sort()];

  const filtered = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "Alle" || product.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="produkte" className="relative py-20 md:py-28 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_45%,#eef7ff_100%)] overflow-hidden">
      <div className="molecule-field molecule-field-right !top-20 !opacity-10" aria-hidden="true" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="badge badge-blue mb-4">Direkte Produktauswahl</span>
          <h2 className="section-title text-brand-dark mb-4">Injizierbares Produkt wählen</h2>
          <p className="section-subtitle mx-auto text-center">
            Preise, Varianten und Bestand werden zentral aus dem 369 Research Shop geladen.
            Nasale und orale Produkte wie Semax oder Adamax sind ausgeschlossen.
          </p>
        </div>

        <div className="mode-switch" aria-label="Patronen-Art auswählen">
          <button type="button" onClick={() => setMode("mixgo")} className={mode === "mixgo" ? "active" : ""}>
            <span>Empfohlen</span><b>Mix &amp; Go</b><small>Pulver in Patrone · BAC-Wasser ergänzen</small>
          </button>
          <button type="button" onClick={() => setMode("plugplay")} className={mode === "plugplay" ? "active" : ""}>
            <span>Komfort</span><b>Plug &amp; Play</b><small>Fertig gemischt · gekühlter Versand</small>
          </button>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Produkt suchen..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                activeCategory === category
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="product-card animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-16 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Keine Produkte gefunden für „{searchQuery}“.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => <ProductCard key={product.id} product={product} mode={mode} />)}
          </div>
        )}

        {!loading && (
          <div className="text-center mt-8 text-gray-400 text-sm">
            {filtered.length} von {products.length} Produkten angezeigt
          </div>
        )}

        <div className="mt-12 max-w-2xl mx-auto text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            Ausschließlich für Forschungszwecke (Research Use Only). Nicht zur menschlichen Anwendung.
            Preise zzgl. Versandkosten.
          </p>
        </div>
      </div>
    </section>
  );
}
