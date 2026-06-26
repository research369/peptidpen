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
      name: "Peptidpen — Der erste wiederverwendbare Peptid-Pen Europas",
      description: "Fertig gemischte Peptid-Patronen für den wiederverwendbaren Forschungspen. Kein Mischen, kein Rechnen, sofort einsatzbereit.",
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
      name: `${p.name} Plug&Play Patrone`,
      description: `${p.name} als fertig gemischte Plug&Play Patrone. Research Use Only.`,
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
          name: "369 Research Forschungspen",
          description: "Wiederverwendbarer Peptid-Pen für Plug&Play Patronen. Research Use Only.",
          image: penProduct.mockupImage ?? undefined,
          url: getShopProductUrl(penProduct.shopProductId),
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
            url: getShopProductUrl(penProduct.shopProductId),
          },
        }
      : null;

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
