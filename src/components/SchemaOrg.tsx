import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { config } from "../lib/config";
import { faqs } from "./FaqSection";

export default function SchemaOrg() {
  const { penProduct } = useProducts();

  useEffect(() => {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "369 Research Sp. z o.o.",
      legalName: "369 RESEARCH Spółka z ograniczoną odpowiedzialnością",
      address: { "@type": "PostalAddress", streetAddress: "ul. Hoża 86/210", postalCode: "00-682", addressLocality: "Warszawa", addressCountry: "PL" },
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

    const faqItems = faqs.map(({ q, a }) => [q, a]);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    };

    const penSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "369 Research Pen",
      description: "369 Peptid-Pen inklusive Case und 3 Pen-Nadeln. Kompatibel mit der 369 Plug&Play Patrone. Research Use Only.",
      image: penProduct?.mockupImage ?? "https://www.369research.eu/products/peptidpen-case-1.png",
      url: `${config.shopBaseUrl}/product/forscherpen`,
      brand: { "@type": "Brand", name: "369 Research" },
      ...(penProduct ? { offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: penProduct?.price ?? 49,
        availability: penProduct?.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        url: `${config.shopBaseUrl}/product/forscherpen`,
      } } : {}),
    };

    // Preview cartridges are not saleable WaWi articles and must not expose offers.
    const schemas = [orgSchema, webPageSchema, faqSchema, penSchema];

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
  }, [penProduct]);

  return null;
}
