import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { config, getShopProductUrl } from "../lib/config";

export default function SchemaOrg() {
  const { products, penProduct } = useProducts();

  useEffect(() => {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "369 Research",
      url: config.shopBaseUrl,
      sameAs: [config.shopBaseUrl],
    };

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Der erste echte Peptid-Pen Europas | 369 Research",
      description: "369 Peptid-Pen mit austauschbarer 369 Plug&Play Patrone. Ein Klick verbindet Pulver und BAC-Wasser direkt in der Patrone.",
      url: config.siteUrl,
      inLanguage: "de-DE",
      publisher: {
        "@type": "Organization",
        name: "369 Research",
        url: config.shopBaseUrl,
      },
    };

    const faqItems = [
      ["Was ist eine 369 Plug&Play Patrone?", "Die 369 Plug&Play Patrone enthält Pulver und BAC-Wasser in zwei getrennten Kammern. Ein Klick verbindet beide Inhalte direkt in der Glaspatrone."],
      ["Wie funktioniert die Aktivierung?", "Ein Klick verbindet beide Kammern und mischt den Inhalt direkt in der Patrone."],
      ["Kann ich den Pen wiederverwenden?", "Ja. Du behältst den 369 Peptid-Pen und wechselst die 369 Plug&Play Patrone."],
      ["Sind die Produkte für den menschlichen Gebrauch bestimmt?", "Nein. Alle Produkte sind ausschließlich für Forschungszwecke bestimmt."],
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    };

    const productSchemas = products.slice(0, 10).map((product) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${product.name} 369 Plug&Play Patrone`,
      description: `${product.name} als 369 Plug&Play Patrone für den 369 Peptid-Pen. Research Use Only.`,
      image: product.mockupImage ?? undefined,
      url: getShopProductUrl(product.shopProductId),
      brand: { "@type": "Brand", name: "369 Research" },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.plugPlayPrice,
        availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: getShopProductUrl(product.shopProductId),
        seller: { "@type": "Organization", name: "369 Research" },
      },
    }));

    const penSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "369 Research Pen",
      description: "369 Peptid-Pen inklusive Case und 3 Pen-Nadeln. Kompatibel mit der 369 Plug&Play Patrone. Research Use Only.",
      image: penProduct?.mockupImage ?? "https://www.369research.eu/products/peptidpen-case-1.png",
      url: `${config.shopBaseUrl}/product/forscherpen`,
      brand: { "@type": "Brand", name: "369 Research" },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: penProduct?.price ?? 49,
        availability: penProduct?.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        url: `${config.shopBaseUrl}/product/forscherpen`,
      },
    };

    const schemas = [orgSchema, webPageSchema, faqSchema, ...productSchemas, penSchema];

    schemas.forEach((schema, index) => {
      const id = `schema-org-${index}`;
      let element = document.getElementById(id) as HTMLScriptElement | null;
      if (!element) {
        element = document.createElement("script");
        element.id = id;
        element.type = "application/ld+json";
        document.head.appendChild(element);
      }
      element.textContent = JSON.stringify(schema);
    });

    return () => {
      schemas.forEach((_, index) => document.getElementById(`schema-org-${index}`)?.remove());
    };
  }, [products, penProduct]);

  return null;
}
