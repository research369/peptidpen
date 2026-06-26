/**
 * useProducts.ts
 * 
 * React Hook für alle Produktdaten.
 * Lädt Plug&Play-Produkte und Pen-Preis parallel aus der API.
 */

import { useState, useEffect } from "react";
import { fetchPlugPlayProducts, fetchPenProduct, type ShopProduct } from "../lib/api";

interface UseProductsResult {
  products: ShopProduct[];
  penProduct: ShopProduct | null;
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [penProduct, setPenProduct] = useState<ShopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [prods, pen] = await Promise.all([
          fetchPlugPlayProducts(),
          fetchPenProduct(),
        ]);
        if (!cancelled) {
          setProducts(prods);
          setPenProduct(pen);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Fehler beim Laden der Produkte");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { products, penProduct, loading, error };
}
