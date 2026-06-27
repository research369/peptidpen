import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { getShopProductUrl, config } from "../lib/config";
import type { ShopProduct } from "../lib/api";

function ProductCard({ product }: { product: ShopProduct }) {
  const lowestVariantPrice = product.variants && product.variants.length > 0
    ? Math.min(...product.variants.map((v) => v.price))
    : product.price;

  const patronenPreis = lowestVariantPrice + config.plugplaySurcharge;
  const hasVariants = product.variants && product.variants.length > 1;

  return (
    <div className="product-card group">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {(product.mockupImage || product.image) ? (
          <img
            src={product.mockupImage || product.image || ''}
            alt={`${product.name} Peptid-Patrone`}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">
            💊
          </div>
        )}
        {/* Patrone Badge */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-brand-blue text-white text-xs shadow-md">
            Plug&amp;Play Patrone
          </span>
        </div>
        {/* Purity Badge */}
        {product.purity && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-green-100 text-green-700 text-xs">
              {product.purity} Reinheit
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-brand-blue font-semibold uppercase tracking-wide mb-1">
          {product.categories.filter(c => c !== "Zubehör").slice(0, 2).join(" · ")}
        </div>
        <h3 className="font-bold text-brand-dark text-lg mb-1 leading-tight">
          {product.name}
        </h3>
        {product.casNumber && (
          <div className="text-xs text-gray-400 mb-3">CAS: {product.casNumber}</div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-brand-dark">
            ab {hasVariants ? patronenPreis : patronenPreis} €
          </span>
          <span className="text-sm text-gray-400">als Patrone</span>
        </div>

        {/* Variants preview */}
        {hasVariants && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.variants!.slice(0, 4).map((v) => (
              <span key={v.label} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {v.label}
              </span>
            ))}
            {product.variants!.length > 4 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                +{product.variants!.length - 4} weitere
              </span>
            )}
          </div>
        )}

        {/* Stock indicator */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-400"}`} />
          <span className="text-xs text-gray-500">
            {product.inStock ? "Auf Lager" : "Derzeit nicht verfügbar"}
          </span>
        </div>

        {/* CTA */}
        <a
          href={getShopProductUrl(product.shopProductId)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-primary w-full text-center text-sm py-3 ${!product.inStock ? "opacity-60 pointer-events-none" : ""}`}
        >
          Als Patrone bestellen →
        </a>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  // Unique categories from products
  const categories = ["Alle", ...Array.from(
    new Set(
      products.flatMap((p) =>
        p.categories.filter((c) => c !== "Zubehör" && c !== "369 BeautyLine")
      )
    )
  ).sort()];

  const filtered = products.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      activeCategory === "Alle" ||
      p.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="produkte" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge badge-blue mb-4">Alle Patronen</span>
          <h2 className="section-title text-brand-dark mb-4">
            Das komplette Patronen-Sortiment
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Alle Produkte fertig gemischt, präzise dosiert und versiegelt.
            Nur patronenfähige Peptide — keine Kompromisse.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Peptid suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="product-card animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-8 bg-gray-200 rounded w-1/3" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            Keine Produkte gefunden für "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Product count */}
        {!loading && (
          <div className="text-center mt-8 text-gray-400 text-sm">
            {filtered.length} von {products.length} Patronen angezeigt
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            Alle Produkte sind ausschließlich für Forschungszwecke bestimmt (Research Use Only).
            Nicht zur menschlichen Anwendung. Preise zzgl. Versandkosten.
          </p>
        </div>
      </div>
    </section>
  );
}
