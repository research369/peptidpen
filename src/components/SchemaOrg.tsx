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
      name: "369 Research Pen und Patronen | Mix & Go oder fertig gemischt",
      description: "Ein wiederverwendbarer Forschungs-Pen mit zwei Patronen-Optionen: Mix & Go zum selbst Anmischen oder fertig gemischt.",
      url: config.siteUrl,
      inLanguage: "de-DE",
      publisher: {
        "@type": "Organization",
        name: "369 Research",
        url: config.shopBaseUrl,
      },
    };

    const faqItems = [
      ["Was ist der Unterschied zwischen Mix & Go und fertig gemischt?", "Bei Mix & Go wird die Patrone selbst angemischt. Die fertig gemischte Patrone wird vorbereitet geliefert."],
      ["Brauche ich für beide Optionen denselben Pen?", "Ja. Der 369 Research Pen ist wiederverwendbar; nur die Patrone wird gewechselt."],
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
      name: `${product.name} Patrone | 369 Research`,
      description: `${product.name} für den 369 Research Pen, erhältlich als Mix & Go oder fertig gemischt. Research Use Only.`,
      image: product.mockupImage ?? undefined,
      url: getShopProductUrl(product.shopProductId),
      brand: { "@type": "Brand", name: "369 Research" },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.price,
        availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: getShopProductUrl(product.shopProductId),
        seller: { "@type": "Organization", name: "369 Research" },
      },
    }));

    const penSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "369 Research Pen",
      description: "Wiederverwendbarer Forschungs-Pen für Mix & Go und fertig gemischte Patronen. Research Use Only.",
      image: penProduct?.mockupImage ?? undefined,
      url: "https://www.369research.eu/plug-and-play",
      brand: { "@type": "Brand", name: "369 Research" },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: penProduct?.price ?? 39,
        availability: penProduct?.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        url: "https://www.369research.eu/plug-and-play",
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
