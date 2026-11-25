import { useState, useEffect } from "react";
import { fetchPenProduct, type ShopProduct } from "../lib/api";

// Share read-only requests, never invent availability or reuse vial stock.
let cachedRequest: Promise<ShopProduct | null> | null = null;
let loadedAt = 0;
function loadPen() {
  if (!cachedRequest || Date.now() - loadedAt > 60_000) {
    loadedAt = Date.now();
    cachedRequest = fetchPenProduct().catch(() => null);
  }
  return cachedRequest;
}
export function useProducts() {
  const [penProduct, setPenProduct] = useState<ShopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    loadPen().then(pen => {
      if (!cancelled) { setPenProduct(pen); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, []);
  return { penProduct, loading };
}
