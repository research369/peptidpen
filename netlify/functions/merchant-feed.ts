import type { Handler } from "@netlify/functions";

const API_BASE = process.env.VITE_API_BASE_URL || "https://369-research-backend-production.up.railway.app";
const SHOP_BASE = process.env.VITE_SHOP_BASE_URL || "https://www.369research.eu";
const PLUG_PLAY_SURCHARGE = parseFloat(process.env.VITE_PLUGPLAY_SURCHARGE || "15");

export const handler: Handler = async () => {
  let products: any[] = [];

  try {
    const res = await fetch(`${API_BASE}/api/shop/products`);
    if (res.ok) {
      const data = await res.json();
      const all = Array.isArray(data) ? data : data.products ?? [];
      products = all.filter((p: any) => p.isPlugPlayEligible && p.inStock);
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
    const productUrl = `${SHOP_BASE}/produkt/${p.shopProductId}`;

    return `  <item>
    <g:id>${p.shopProductId}-patrone</g:id>
    <g:title>${escapeXml(p.name)} Plug&amp;Play Patrone</g:title>
    <g:description>${escapeXml(p.description || `${p.name} als fertig gemischte Plug&Play Patrone. Research Use Only.`)}</g:description>
    <g:link>${productUrl}</g:link>
    <g:image_link>${escapeXml(p.mockupImage || "")}</g:image_link>
    <g:condition>new</g:condition>
    <g:availability>in_stock</g:availability>
    <g:price>${patronenPreis} EUR</g:price>
    <g:brand>369 Research</g:brand>
    <g:google_product_category>5765</g:google_product_category>
    <g:product_type>Peptide &gt; Plug&amp;Play Patronen</g:product_type>
    <g:identifier_exists>no</g:identifier_exists>
    <g:adult>no</g:adult>
    <g:custom_label_0>PlugPlay</g:custom_label_0>
    <g:custom_label_1>${escapeXml((p.categories || []).slice(0, 1).join(""))}</g:custom_label_1>
  </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Peptidpen — 369 Research Plug&amp;Play Patronen</title>
    <link>https://www.peptidpen.de</link>
    <description>Fertig gemischte Peptid-Patronen. Research Use Only.</description>
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
