/**
 * useProducts.ts
 * 
 * React Hook für alle Produktdaten.
 * Lädt Plug&Play-Produkte und Pen-Preis parallel aus der API.
 */

import { useState, useEffect } from "react";
import { fetchPlugPlayProducts, fetchPenProduct, type ShopProduct } from "../lib/api";
import { FALLBACK_PRODUCTS, FALLBACK_PEN } from "../lib/fallbackProducts";

interface UseProductsResult {
  products: ShopProduct[];
  penProduct: ShopProduct | null;
  loading: boolean;
  error: string | null;
  usingFallback: boolean;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [penProduct, setPenProduct] = useState<ShopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [prods, pen] = await Promise.all([
          fetchPlugPlayProducts(),
          fetchPenProduct(),
        ]);
        if (!cancelled) {
          if (prods && prods.length > 0) {
            setProducts(prods);
          } else {
            setProducts(FALLBACK_PRODUCTS as unknown as ShopProduct[]);
            setUsingFallback(true);
          }
          setPenProduct(pen ?? (FALLBACK_PEN as unknown as ShopProduct));
        }
      } catch (_err) {
        if (!cancelled) {
          // API nicht erreichbar — Fallback-Daten verwenden (transparent)
          setProducts(FALLBACK_PRODUCTS as unknown as ShopProduct[]);
          setPenProduct(FALLBACK_PEN as unknown as ShopProduct);
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { products, penProduct, loading, error, usingFallback };
}
