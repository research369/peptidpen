/**
 * config.ts
 * 
 * Zentrale Konfiguration — alle Werte kommen aus Umgebungsvariablen.
 * NIEMALS Werte hier hardcoden. Stattdessen .env.example pflegen.
 * 
 * Für Netlify: Variablen unter Site Settings → Environment Variables eintragen.
 */

export const config = {
  /** Basis-URL des Railway-Backends */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,

  /** Basis-URL des Hauptshops für Produkt-Weiterleitungen */
  shopBaseUrl: (import.meta.env.VITE_SHOP_BASE_URL as string) || "https://www.369research.eu",

  /** Aufpreis für Plug&Play Patrone in Euro */
  plugplaySurcharge: Number(import.meta.env.VITE_PLUGPLAY_SURCHARGE ?? 15),

  /** Shop-ID des Forscherpen-Produkts */
  penProductId: import.meta.env.VITE_PEN_PRODUCT_ID as string,

  /** WhatsApp-Nummer (ohne +, ohne Leerzeichen) */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER as string,

  /** Kanonische Site-URL */
  siteUrl: import.meta.env.VITE_SITE_URL as string,
} as const;

/** Direkte URL zur Pen-Kaufseite (Plug&Play Landing Page) */
export const PEN_BUY_URL = `${config.shopBaseUrl}/plug-and-play`;

/** Gibt die vollständige Produkt-URL im Hauptshop zurück */
export function getShopProductUrl(shopProductId: string): string {
  return `${config.shopBaseUrl}/produkt/${shopProductId}`;
}

/** Gibt die WhatsApp-URL zurück */
export function getWhatsAppUrl(message?: string): string {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hallo, ich interessiere mich für den Peptidpen.");
  return `https://wa.me/${config.whatsappNumber}?text=${text}`;
}
