/**
 * api.ts
 * 
 * Alle API-Calls zum 369 Research Railway-Backend.
 * Nutzt denselben tRPC-Endpunkt wie der Hauptshop — read-only, kein Auth nötig.
 * 
 * Keine Schreib-Operationen hier — Bestellungen laufen über 369research.eu.
 */

import { config } from "./config";
import { publicTrpcQuery } from "./publicTrpc";
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
  return publicTrpcQuery<T>(config.apiBaseUrl, path, input);
}

// ─── Products API ─────────────────────────────────────────────────────────────

/**
 * Lädt alle Shop-Produkte und filtert auf Plug&Play-fähige Produkte.
 * Verwendet ausschließlich den festen Produkt-/Variantenpreis aus der WaWi.
 * Es gibt keinen pauschalen Patronen-Aufpreis.
 */
export async function fetchPlugPlayProducts(): Promise<ShopProduct[]> {
  const raw = await trpcQuery<ShopProduct[]>("article.shopProducts");

  return raw
    .filter((p) => isPlugPlayEligible(p))
    .map((p) => ({
      ...p,
      isPlugPlayEligible: true,
      // Günstigster verbindlicher WaWi-Preis, ohne lokalen Aufschlag.
      plugPlayPrice:
        (p.variants && p.variants.length > 0
          ? Math.min(...p.variants.map((v) => v.price))
          : p.price),
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
