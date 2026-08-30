import type { Handler } from "@netlify/functions";

const API_BASE = process.env.VITE_API_BASE_URL || "https://369-research-backend-production.up.railway.app";
const SHOP_BASE = process.env.VITE_SHOP_BASE_URL || "https://www.369research.eu";
const PLUG_PLAY_SURCHARGE = parseFloat(process.env.VITE_PLUGPLAY_SURCHARGE || "15");
const PEN_BUY_URL = "https://www.369research.eu/product/forscherpen";
const PEN_IMAGE = "https://www.369research.eu/products/peptidpen-case-1.png";

export const handler: Handler = async () => {
  let products: any[] = [];

  try {
    const res = await fetch(`${API_BASE}/api/trpc/article.shopProducts`);
    if (res.ok) {
      const data = await res.json();
      const all = data.result?.data?.json ?? [];
      products = all.filter((p: any) => p.inStock && isEligible(p));
    }
  } catch {
    return {
      statusCode: 503,
      body: "Service temporarily unavailable",
    };
  }

  const items = products.map((p: any) => {
    const basePrice = p.variants && p.variants.length > 0
      ? Math.min(...p.variants.map((v: any) => v.price))
      : p.price;
    const patronenPreis = (basePrice + PLUG_PLAY_SURCHARGE).toFixed(2);
    const productUrl = `${SHOP_BASE}/product/${p.shopProductId}`;
    const category = (p.categories || []).slice(0, 1).join("") || "Peptide";

    return `  <item>
    <g:id>${p.shopProductId}-patrone</g:id>
    <g:title>Peptidpatrone ${escapeXml(p.name)} — Plug&amp;Play Patrone für Peptide | 369 Research</g:title>
    <g:description>${escapeXml(`${p.name} als fertig gemischte Plug&Play-Patrone für den 369 Research Peptidpen, mit gekühltem Versand. Research Use Only.`)}</g:description>
    <g:link>${productUrl}</g:link>
    <g:image_link>${escapeXml(p.image || p.mockupImage || PEN_IMAGE)}</g:image_link>
    <g:condition>new</g:condition>
    <g:availability>in_stock</g:availability>
    <g:price>${patronenPreis} EUR</g:price>
    <g:brand>369 Research</g:brand>
    <g:google_product_category>5765</g:google_product_category>
    <g:product_type>Peptide &gt; Plug&Play Patronen &gt; Plug&amp;Play Patronen</g:product_type>
    <g:identifier_exists>no</g:identifier_exists>
    <g:adult>no</g:adult>
    <g:custom_label_0>PlugPlay</g:custom_label_0>
    <g:custom_label_1>${escapeXml(category)}</g:custom_label_1>
    <g:custom_label_2>Peptidpatrone</g:custom_label_2>
    <g:custom_label_3>Peptidpen-kompatibel</g:custom_label_3>
  </item>`;
  });

  // Pen-Eintrag immer hinzufügen (unabhängig von API)
  const penItem = `  <item>
    <g:id>forscherpen-369research</g:id>
    <g:title>Peptidpen 369 Research mit Case und 3 Pen-Nadeln</g:title>
    <g:description>Wiederverwendbarer 369 Research Peptidpen inklusive Case und 3 Pen-Nadeln für passende Mix &amp; Go und Plug&amp;Play-Patronen. Research Use Only.</g:description>
    <g:link>${PEN_BUY_URL}</g:link>
    <g:image_link>${PEN_IMAGE}</g:image_link>
    <g:condition>new</g:condition>
    <g:availability>in_stock</g:availability>
    <g:price>49.00 EUR</g:price>
    <g:brand>369 Research</g:brand>
    <g:google_product_category>5765</g:google_product_category>
    <g:product_type>Peptide &gt; Peptidpen</g:product_type>
    <g:identifier_exists>no</g:identifier_exists>
    <g:adult>no</g:adult>
    <g:custom_label_0>Pen</g:custom_label_0>
    <g:custom_label_1>Peptidpen</g:custom_label_1>
    <g:custom_label_2>Plug-and-Play-System</g:custom_label_2>
    <g:custom_label_3>Case-und-3-Nadeln</g:custom_label_3>
  </item>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Peptidpen &amp; Plug&Play Patronen — Plug&amp;Play Patrone für Peptide | 369 Research</title>
    <link>https://www.peptidpen.de</link>
    <description>Fertig gemischte Plug&Play Patronen als Plug&amp;Play Patrone für Peptide. Passend für den 369 Research Peptidpen. Research Use Only.</description>
${penItem}
${items.join("\n")}
  </channel>
</rss>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
    body: xml,
  };
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isEligible(product: any): boolean {
  const excludedCategories = ["Forscher-Bundles", "369 BeautyLine", "Fertigpens", "Forscherpens", "Tabletten", "Kapseln / Tabletten", "Zubehör"];
  const excludedIds = ["selank", "semax", "oxytocin", "adamax", "semax-selank", "melanotan-1", "melanotan-2", "dsip", "snap-8", "snap8", "SNAP-8"];
  const categories = product.categories ?? (product.category ? [product.category] : []);
  return !excludedIds.includes(product.id ?? product.sku ?? "")
    && !categories.some((category: string) => excludedCategories.includes(category))
    && !["nasal", "tablet", "capsule"].includes(product.type);
}
