import type { Handler } from "@netlify/functions";

const SITE_URL = process.env.VITE_SITE_URL || "https://www.peptidpen.de";

export const handler: Handler = async () => {
  const now = new Date().toISOString().split("T")[0];

  const pages = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/datenschutz", priority: "0.3", changefreq: "yearly" },
    { path: "/agb", priority: "0.3", changefreq: "yearly" },
  ];

  const urls = pages.map(({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);

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
