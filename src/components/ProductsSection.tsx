import { useState } from "react";
import { cartridgePreviewCatalog, type CartridgePreviewProduct } from "../lib/cartridgePreviewCatalog";
import { addPreviewItem } from "../lib/previewCart";

function ProductCard({ product }: { product: CartridgePreviewProduct }) {
  const [added, setAdded] = useState(false);

  return (
    <article className="product-card group">
      <div className="relative bg-gradient-to-br from-white via-[#f4f9ff] to-[#e8f4ff] border-b border-blue-100">
        <div className="catalog-label-stage">
          <div className="catalog-label" role="img" aria-label={`${product.name} – weiß-blaues 369 Produktlabel`}>
            <img src="/assets/369-research-logo.png" alt="369 Research" />
            <span className="catalog-label-format">369 Plug&amp;Play Patrone</span>
            <strong>{product.name}</strong>
            <span className="catalog-label-footer">RESEARCH USE ONLY</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs text-brand-blue font-semibold uppercase tracking-wide mb-1">
          {product.categories.filter((category) => category !== "Zubehör").slice(0, 2).join(" · ")}
        </div>
        <h3 className="font-bold text-brand-dark text-lg mb-3 leading-tight">{product.name}</h3>

        <p className="text-sm text-brand-blue">Bald erhältlich</p>
        <button className="staging-outline-button w-full mt-4" onClick={() => { addPreviewItem(product.id, product.name); setAdded(true); }}>{added ? "VORGEMERKT" : "VORMERKEN"}</button>
        {added && <a className="block mt-3 text-brand-blue underline" href="/checkout">Auswahl ansehen</a>}
      </div>
    </article>
  );
}

export default function ProductsSection() {
  const products = cartridgePreviewCatalog;
  const loading = false;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

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
    <section id="produkte" className="products-lab-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="staging-heading">369 Plug&amp;Play Patrone</h2>
          <p className="section-subtitle mx-auto text-center mt-5">
            Entdecke die kommende Auswahl.
          </p>
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
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}

        {!loading && (
          <div className="text-center mt-8 text-gray-400 text-sm">
            {filtered.length} Produkte
          </div>
        )}

        <div className="mt-12 max-w-2xl mx-auto text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            Ausschließlich für Forschungszwecke (Research Use Only). Nicht zur menschlichen Anwendung.
          </p>
        </div>
      </div>
    </section>
  );
}
