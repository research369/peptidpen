/**
 * config.ts
 * 
 * Zentrale Konfiguration — alle Werte kommen aus Umgebungsvariablen.
 * NIEMALS Werte hier hardcoden. Stattdessen .env.example pflegen.
 * 
 * Für Netlify: Variablen unter Site Settings → Environment Variables eintragen.
 */

function positiveNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const config = {
  /** Basis-URL des Railway-Backends */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,

  /** Basis-URL des Hauptshops für Produkt-Weiterleitungen */
  shopBaseUrl: (import.meta.env.VITE_SHOP_BASE_URL as string) || "https://www.369research.eu",

  /** Aufpreis für Plug&Play Patrone in Euro */
  plugplaySurcharge: positiveNumber(import.meta.env.VITE_PLUGPLAY_SURCHARGE, 15),

  /** Shop-ID des Forscherpen-Produkts */
  penProductId: (import.meta.env.VITE_PEN_PRODUCT_ID as string) || "forscherpen",

  /** WhatsApp-Nummer (ohne +, ohne Leerzeichen) */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER as string,

  /** Kanonische Site-URL */
  siteUrl: import.meta.env.VITE_SITE_URL as string,
} as const;

/** Direkte URL zum Peptidpen-Produkt */
export const PEN_BUY_URL = `${config.shopBaseUrl}/product/forscherpen`;

const ATTRIBUTION_PARAMS = [
  "_qr", "qr_code", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
];

/** Reicht vorhandene QR-/Kampagnenparameter an den Hauptshop weiter. */
export function withAttribution(target: string): string {
  if (typeof window === "undefined") return target;

  const destination = new URL(target);
  const source = new URLSearchParams(window.location.search);
  ATTRIBUTION_PARAMS.forEach((key) => {
    const value = source.get(key);
    if (value) destination.searchParams.set(key, value);
  });
  return destination.toString();
}

export function getPenBuyUrl(): string {
  return withAttribution(PEN_BUY_URL);
}

/** Gibt die vollständige Produkt-URL im Hauptshop zurück */
export function getShopProductUrl(shopProductId: string): string {
  return withAttribution(`${config.shopBaseUrl}/product/${shopProductId}`);
}

/** Gibt die WhatsApp-URL zurück */
export function getWhatsAppUrl(message?: string): string {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hallo, ich interessiere mich für den Peptidpen.");
  return `https://wa.me/${config.whatsappNumber}?text=${text}`;
}
