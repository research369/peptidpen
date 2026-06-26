/**
 * api.ts
 * 
 * Alle API-Calls zum 369 Research Railway-Backend.
 * Nutzt denselben tRPC-Endpunkt wie der Hauptshop — read-only, kein Auth nötig.
 * 
 * Keine Schreib-Operationen hier — Bestellungen laufen über 369research.eu.
 */

import { config } from "./config";
import { isPlugPlayEligible } from "./plugPlayConfig";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductVariant {
  label: string;
  price: number;
  sku: string;
  dosage?: string;
  stock?: number;
  inStock?: boolean;
}

export interface ShopProduct {
  id: string;
  shopProductId: string;
  name: string;
  category: string;
  categories: string[];
  price: number;
  salePrice: number | null;
  salePriceLabel: string | null;
  mockupImage: string | null;
  image: string | null;
  casNumber: string;
  molecularWeight: string;
  purity: string;
  badge: string | null;
  labReportImage: string | null;
  galleryImages: string[] | null;
  shortDescription: string | null;
  description: string | null;
  stock: number;
  inStock: boolean;
  variants: ProductVariant[] | null;
  // Computed
  plugPlayPrice: number;
  isPlugPlayEligible: boolean;
}

// ─── tRPC Query Helper ────────────────────────────────────────────────────────

async function trpcQuery<T>(
  path: string,
  input?: Record<string, unknown>
): Promise<T> {
  const url = new URL(
    `${config.apiBaseUrl}/api/trpc/${path}`
  );
  if (input) {
    url.searchParams.set("input", JSON.stringify(input));
  }
  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  return json.result?.data?.json as T;
}

// ─── Products API ─────────────────────────────────────────────────────────────

/**
 * Lädt alle Shop-Produkte und filtert auf Plug&Play-fähige Produkte.
 * Berechnet den Patronenpreis dynamisch (Basispreis + Aufpreis aus config).
 */
export async function fetchPlugPlayProducts(): Promise<ShopProduct[]> {
  const raw = await trpcQuery<ShopProduct[]>("article.shopProducts");

  return raw
    .filter((p) => isPlugPlayEligible(p))
    .map((p) => ({
      ...p,
      isPlugPlayEligible: true,
      // Günstigste Variante als Basispreis, sonst Produktpreis
      plugPlayPrice:
        (p.variants && p.variants.length > 0
          ? Math.min(...p.variants.map((v) => v.price))
          : p.price) + config.plugplaySurcharge,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Lädt das Pen-Produkt für den dynamischen Pen-Preis.
 */
export async function fetchPenProduct(): Promise<ShopProduct | null> {
  const raw = await trpcQuery<ShopProduct | null>("article.shopArticle", {
    shopProductId: config.penProductId,
  });
  if (!raw) return null;
  return {
    ...raw,
    isPlugPlayEligible: false,
    plugPlayPrice: raw.price,
  };
}
