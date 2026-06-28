import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { config, getShopProductUrl } from "../lib/config";

export default function SchemaOrg() {
  const { products, penProduct } = useProducts();

  useEffect(() => {
    // Organization Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "369 Research",
      url: config.shopBaseUrl,
      sameAs: [config.shopBaseUrl],
      description: "Europäischer Anbieter von Research Compounds und Peptiden. Entwickler des ersten wiederverwendbaren Peptid-Pens Europas.",
    };

    // WebPage Schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Peptidpen & Peptidpatronen — Plug&Play Patrone für Peptide | 369 Research",
      description: "Peptidpen kaufen: Fertig gemischte Peptidpatronen als Plug&Play Patrone für Peptide. Kein Mischen, kein Rechnen — sofort einsatzbereit. Entwickelt & produziert in Deutschland.",
      url: config.siteUrl,
      inLanguage: "de-DE",
      publisher: {
        "@type": "Organization",
        name: "369 Research",
        url: config.shopBaseUrl,
      },
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Was ist ein Peptidpen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ein Peptidpen ist ein wiederverwendbares Pen-System für fertig gemischte Peptid-Patronen. Er ersetzt die klassische Insulinspritze und ermöglicht präzise Anwendung ohne Vorbereitung.",
          },
        },
        {
          "@type": "Question",
          name: "Was ist eine Plug&Play Patrone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eine Plug&Play Patrone ist eine 3-ml-Glaspatrone mit bereits rekonstituiertem Peptid in korrekter Konzentration. Direkt in den Forschungspen einsetzen — kein Mischen erforderlich.",
          },
        },
        {
          "@type": "Question",
          name: "Wie viel kostet der Aufpreis für eine Patrone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Der Aufpreis für die Plug&Play Patrone beträgt ${config.plugplaySurcharge} € gegenüber dem Standard-Vial. Dieser Aufpreis deckt Reinraum-Abfüllung und pharmazeutische Verpackung ab.`,
          },
        },
        {
          "@type": "Question",
          name: "Sind die Produkte für den menschlichen Gebrauch bestimmt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nein. Alle Produkte sind ausschließlich für Forschungszwecke bestimmt (Research Use Only). Nicht zur menschlichen Anwendung.",
          },
        },
      ],
    };

    // Product Schemas for plug&play eligible products
    const productSchemas = products.slice(0, 10).map((p) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Peptidpatrone ${p.name} — Plug&Play Patrone für Peptide | 369 Research`,
      description: `${p.name} als fertig gemischte Peptidpatrone (Plug&Play Patrone für Peptide). Passend für den 369 Research Peptidpen. Research Use Only.`,
      image: p.mockupImage ?? undefined,
      url: getShopProductUrl(p.shopProductId),
      brand: {
        "@type": "Brand",
        name: "369 Research",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: p.plugPlayPrice,
        availability: p.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: getShopProductUrl(p.shopProductId),
        seller: {
          "@type": "Organization",
          name: "369 Research",
        },
      },
    }));

    // Pen Product Schema
    const penSchema = penProduct
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Peptidpen 369 Research — Wiederverwendbarer Pen für Peptidpatronen",
          description: "Der 369 Research Peptidpen: Wiederverwendbarer Pen für fertig gemischte Peptidpatronen (Plug&Play Patrone für Peptide). Entwickelt in Deutschland. Research Use Only.",
          image: penProduct.mockupImage ?? undefined,
          url: "https://www.369research.eu/plug-and-play",
          brand: {
            "@type": "Brand",
            name: "369 Research",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: penProduct.price,
            availability: penProduct.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: "https://www.369research.eu/plug-and-play",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Peptidpen 369 Research — Wiederverwendbarer Pen für Peptidpatronen",
          description: "Der 369 Research Peptidpen: Wiederverwendbarer Pen für fertig gemischte Peptidpatronen (Plug&Play Patrone für Peptide). Entwickelt in Deutschland. Research Use Only.",
          url: "https://www.369research.eu/plug-and-play",
          brand: { "@type": "Brand", name: "369 Research" },
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: 39,
            availability: "https://schema.org/InStock",
            url: "https://www.369research.eu/plug-and-play",
          },
        };

    // Inject all schemas
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schemas: any[] = [orgSchema, webPageSchema, faqSchema, ...productSchemas];
    if (penSchema) schemas.push(penSchema);

    schemas.forEach((schema, i) => {
      const id = `schema-org-${i}`;
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement("script");
        el.id = id;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    });

    return () => {
      schemas.forEach((_, i) => {
        document.getElementById(`schema-org-${i}`)?.remove();
      });
    };
  }, [products, penProduct]);

  return null;
}
