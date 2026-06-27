/**
 * plugPlayConfig.ts
 * 
 * Zentrale Konfiguration für Plug&Play Patronen.
 * Identische Logik wie im 369research.eu Frontend — kein Divergieren.
 * 
 * Aufpreis kommt aus config.plugplaySurcharge (Umgebungsvariable).
 * KEINE Hardcodes hier — nur Ausschluss-Listen.
 */

/** Kategorien, die KEINE Plug&Play-Patrone bekommen */
export const PLUGPLAY_EXCLUDED_CATEGORIES = [
  "Forscher-Bundles",
  "369 BeautyLine",
  "Fertigpens",
  "Forscherpens",
  "Tabletten",
  "Kapseln / Tabletten",
  "Zubehör",
  "Nasensprays",
];

/**
 * Produkt-IDs, die KEINE Plug&Play-Patrone bekommen.
 * Muss synchron mit dem Hauptshop gehalten werden.
 */
export const PLUGPLAY_EXCLUDED_IDS = [
  "369-retinal-shot",
  "369-deep-collagen-mask",
  "perfect-skin-bundle",
  "selank",
  "semax",
  "oxytocin",
  "adamax",
  "semax-selank",
  "melanotan-1",
  "melanotan-2",
  "pt-141",
  "dsip",
  "PEN-BLAU",
  "PEN-GOLD",
  "PEN-LILA",
  "PEN-ROSA",
  "PEN-KARTUSCHE-5ER",
  "PEN-NADELN-10ER",
  "forscherpen",
  "insulinspritzen",
  "pen-nadeln",
  "pen-kartusche",
  "bac-wasser-3ml",
];

/**
 * Prüft ob ein Produkt für die Plug&Play Patrone berechtigt ist.
 * Exakt dieselbe Logik wie im Hauptshop.
 */
export function isPlugPlayEligible(product: {
  id?: string;
  sku?: string;
  categories?: string[];
  category?: string;
  type?: string;
}): boolean {
  const productId = product.id ?? product.sku ?? "";
  if (PLUGPLAY_EXCLUDED_IDS.includes(productId)) return false;

  const cats = product.categories ?? (product.category ? [product.category] : []);
  if (cats.some((c) => PLUGPLAY_EXCLUDED_CATEGORIES.includes(c))) return false;

  if (
    product.type === "nasal" ||
    product.type === "tablet" ||
    product.type === "capsule"
  )
    return false;

  return true;
}
