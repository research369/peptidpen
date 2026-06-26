import type { Handler } from "@netlify/functions";

const SHOP_BASE = process.env.VITE_SHOP_BASE_URL || "https://www.369research.eu";
const API_BASE = process.env.VITE_API_BASE_URL || "https://369-research-backend-production.up.railway.app";
const SITE_URL = process.env.VITE_SITE_URL || "https://www.peptidpen.de";

export const handler: Handler = async () => {
  let products: Array<{ shopProductId: string; name: string }> = [];

  try {
    const res = await fetch(`${API_BASE}/api/shop/products`);
    if (res.ok) {
      const data = await res.json();
      const all = Array.isArray(data) ? data : data.products ?? [];
      products = all.filter((p: any) => p.isPlugPlayEligible);
    }
  } catch {
    // Fallback: sitemap without product URLs
  }

  const now = new Date().toISOString().split("T")[0];

  const urls = [
    `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    ...products.map(
      (p) => `  <url>
    <loc>${SHOP_BASE}/produkt/${p.shopProductId}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
    body: xml,
  };
};
