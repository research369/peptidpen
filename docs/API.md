# API-Integration — peptidpen.de

> **Für externe Entwickler und KI-Agenten** — vollständige Dokumentation der Backend-Anbindung.

---

## Überblick

`peptidpen.de` kommuniziert ausschließlich **lesend** mit dem 369 Research Railway-Backend. Es gibt keine Schreiboperationen, keine Authentifizierung und keinen eigenen Server.

| Endpoint | Zweck | Aufrufer |
|---|---|---|
| `tRPC: article.shopProducts` | Alle Shop-Produkte | `api.ts` → `useProducts.ts` |
| `tRPC: article.shopArticle` | Einzelnes Produkt (Pen) | `api.ts` → `useProducts.ts` |
| `REST: /api/shop/products` | Produkte für Merchant Feed | `netlify/functions/merchant-feed.ts` |

---

## Railway Backend

**Base URL:** `https://369-research-backend-production.up.railway.app`  
**Protokoll:** tRPC über HTTP GET (query parameters)  
**Auth:** Keine — öffentliche read-only Endpoints  
**CORS:** Erlaubt `peptidpen.de` und `369research.eu`

---

## tRPC Query Helper

Alle API-Calls laufen über den generischen `trpcQuery`-Helper in `src/lib/api.ts`:

```typescript
async function trpcQuery<T>(
  path: string,
  input?: Record<string, unknown>
): Promise<T> {
  const url = new URL(`${config.apiBaseUrl}/api/trpc/${path}`);
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
```

**Response-Format (tRPC):**
```json
{
  "result": {
    "data": {
      "json": [ /* Produktdaten */ ]
    }
  }
}
```

---

## Produkt-Typen

```typescript
// src/lib/api.ts

export interface ProductVariant {
  label: string;      // z.B. "5mg", "10mg"
  price: number;      // Preis in Euro
  sku: string;        // SKU der Variante
  dosage?: string;
  stock?: number;
  inStock?: boolean;
}

export interface ShopProduct {
  id: string;                    // Interne ID
  shopProductId: string;         // URL-Slug im Shop (z.B. "bpc-157")
  name: string;                  // Produktname (deutsch)
  category: string;              // Primäre Kategorie
  categories: string[];          // Alle Kategorien
  price: number;                 // Basispreis in Euro
  salePrice: number | null;      // Aktionspreis (falls vorhanden)
  salePriceLabel: string | null;
  mockupImage: string | null;    // Produktbild-URL
  image: string | null;
  casNumber: string;             // CAS-Nummer
  molecularWeight: string;       // Molekulargewicht
  purity: string;                // Reinheit (z.B. ">99%")
  badge: string | null;          // Badge-Text (z.B. "Bestseller")
  labReportImage: string | null;
  galleryImages: string[] | null;
  shortDescription: string | null;
  description: string | null;
  stock: number;
  inStock: boolean;
  variants: ProductVariant[] | null;
  // Berechnete Felder (client-side):
  plugPlayPrice: number;         // Basispreis + plugplaySurcharge
  isPlugPlayEligible: boolean;
}
```

---

## API-Funktionen

### `fetchPlugPlayProducts()`

Lädt alle Shop-Produkte und filtert auf Plug&Play-fähige Produkte.

```typescript
export async function fetchPlugPlayProducts(): Promise<ShopProduct[]> {
  const raw = await trpcQuery<ShopProduct[]>("article.shopProducts");
  return raw
    .filter((p) => isPlugPlayEligible(p))
    .map((p) => ({
      ...p,
      isPlugPlayEligible: true,
      plugPlayPrice:
        (p.variants && p.variants.length > 0
          ? Math.min(...p.variants.map((v) => v.price))
          : p.price) + config.plugplaySurcharge,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
```

**Preis-Berechnung:** `min(Variantenpreise) + plugplaySurcharge` oder `Produktpreis + plugplaySurcharge`

### `fetchPenProduct()`

Lädt das Pen-Produkt für die dynamische Pen-Preisanzeige.

```typescript
export async function fetchPenProduct(): Promise<ShopProduct | null> {
  return await trpcQuery<ShopProduct | null>("article.shopArticle", {
    shopProductId: config.penProductId,
  });
}
```

---

## Fallback-Strategie

Wenn die Railway API nicht erreichbar ist, greift `useProducts.ts` automatisch auf statische Fallback-Daten zurück:

```typescript
// src/hooks/useProducts.ts (vereinfacht)
try {
  const data = await fetchPlugPlayProducts();
  setProducts(data);
} catch (err) {
  // API nicht erreichbar → Fallback
  const fallback = fallbackProducts
    .filter(isPlugPlayEligible)
    .map(p => ({
      ...p,
      plugPlayPrice: p.price + config.plugplaySurcharge,
    }));
  setProducts(fallback);
  setUsingFallback(true);
}
```

### Fallback-Daten (`src/lib/fallbackProducts.ts`)

- **33 statische Produkte** mit allen Pflichtfeldern
- Deutsche Kategorienamen (identisch mit 369research.eu)
- Pflichtfeld `categories: string[]` muss bei jedem Produkt vorhanden sein
- Preise können veraltet sein — nur als Notfall-Anzeige gedacht

**Wann aktualisieren?** Wenn neue Produkte im Hauptshop hinzugefügt werden, sollten sie auch in `fallbackProducts.ts` ergänzt werden. Mindestens muss das Pflichtfeld `categories` korrekt gesetzt sein.

---

## Netlify Functions

### `netlify/functions/sitemap.ts`

Generiert eine XML-Sitemap für Suchmaschinen.

**Erreichbar unter:** `https://peptidpen.de/sitemap.xml`  
**Netlify-Route:** `/.netlify/functions/sitemap` (via `netlify.toml` Redirect)

Enthält:
- Statische URLs: `/`, `/datenschutz`, `/agb`
- Dynamische Produkt-URLs (aus Railway API)

### `netlify/functions/merchant-feed.ts`

Generiert einen Google Merchant Center XML-Feed.

**Erreichbar unter:** `https://peptidpen.de/merchant-feed.xml`  
**Netlify-Route:** `/.netlify/functions/merchant-feed`

**Datenquelle:** `${API_BASE}/api/shop/products` (REST, nicht tRPC)  
**Filter:** `isPlugPlayEligible && inStock`

**Produkt-Titel-Format:**
```
Peptidpatrone {Produktname} — Plug&Play Patrone für Peptide | 369 Research
```

**Pen-Eintrag:** Wird immer hinzugefügt, unabhängig von der API-Verfügbarkeit.

---

## Konfiguration für API-Calls

Alle API-URLs kommen aus `src/lib/config.ts`:

```typescript
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  shopBaseUrl: import.meta.env.VITE_SHOP_BASE_URL || "https://www.369research.eu",
  plugplaySurcharge: Number(import.meta.env.VITE_PLUGPLAY_SURCHARGE ?? 15),
  penProductId: import.meta.env.VITE_PEN_PRODUCT_ID,
  // ...
};
```

**Für Netlify Functions** (serverseitig) werden die gleichen Env-Vars ohne `import.meta.env` verwendet:
```typescript
const API_BASE = process.env.VITE_API_BASE_URL || "https://369-research-backend-production.up.railway.app";
```

---

## Fehlerbehandlung

| Fehlerfall | Verhalten |
|---|---|
| API Timeout | Fallback-Produkte werden geladen |
| API 5xx | Fallback-Produkte werden geladen |
| CORS-Fehler | Fallback-Produkte werden geladen |
| Merchant Feed API-Fehler | HTTP 503 zurückgeben |
| Sitemap API-Fehler | Nur statische URLs ausgeben |

---

*Weiter: [DEPLOY.md](DEPLOY.md) — Deployment-Guide.*
