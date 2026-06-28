# Architektur — peptidpen.de

> **Für externe Entwickler und KI-Agenten** — vollständige Beschreibung der System-Architektur.

---

## Überblick

`peptidpen.de` ist eine **statische Single-Page Application (SPA)** ohne eigenes Backend, ohne Datenbank und ohne Authentifizierung. Die Seite ist vollständig isoliert vom Hauptshop `369research.eu` und der internen Warenwirtschaft.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (User)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Netlify CDN (Static)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React SPA (dist/)                                       │   │
│  │  - index.html + JS-Bundle (Vite Build)                  │   │
│  │  - Tailwind CSS (inlined)                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Netlify Functions (serverless)                          │   │
│  │  - /.netlify/functions/sitemap → /sitemap.xml           │   │
│  │  - /.netlify/functions/merchant-feed → /merchant-feed.xml│  │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ tRPC (HTTPS, read-only)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│            Railway Backend (369-research-backend)               │
│  - tRPC endpoint: /api/trpc/article.shopProducts                │
│  - tRPC endpoint: /api/trpc/article.shopArticle                 │
│  - CORS: erlaubt peptidpen.de                                   │
│  - Nur lesender Zugriff — keine Schreiboperationen              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Datenfluss

### Produktdaten (Hauptpfad)

```
useProducts.ts (Hook)
  └─→ api.ts: fetchPlugPlayProducts()
        └─→ tRPC: article.shopProducts
              └─→ Railway Backend
                    └─→ Produktliste (alle Produkte)
                          └─→ Filter: isPlugPlayEligible()
                                └─→ Preis + Aufpreis berechnen
                                      └─→ ProductsSection.tsx
```

### Produktdaten (Fallback)

Wenn die Railway API nicht erreichbar ist (Timeout, CORS-Fehler, 5xx), greift `useProducts.ts` automatisch auf `fallbackProducts.ts` zurück:

```
useProducts.ts
  └─→ API-Fehler / Timeout
        └─→ fallbackProducts.ts (33 statische Produkte)
              └─→ isPlugPlayEligible() Filter
                    └─→ ProductsSection.tsx
                          └─→ Banner: "Produkte werden geladen..."
```

Der Fallback enthält alle 33 Produkte mit korrekten deutschen Kategorienamen, identisch zu `369research.eu`.

### Netlify Functions (Sitemap & Merchant Feed)

```
GET /sitemap.xml
  └─→ Netlify Redirect → /.netlify/functions/sitemap
        └─→ Statische URL-Liste + dynamische Produkt-URLs
              └─→ XML Response

GET /merchant-feed.xml
  └─→ Netlify Redirect → /.netlify/functions/merchant-feed
        └─→ Railway API: /api/shop/products
              └─→ Filter: isPlugPlayEligible + inStock
                    └─→ Google Shopping XML Feed
```

---

## Komponenten-Baum

```
App.tsx (Routing)
├── / (Home)
│   ├── SchemaOrg.tsx          (JSON-LD, kein sichtbares UI)
│   ├── AgeGateModal.tsx       (Modal, blockiert bei erstem Besuch)
│   ├── HeroSection.tsx        (Hero + Trust Banner)
│   ├── ProblemSection.tsx     (Problem/Lösung)
│   ├── PenSystemBanner.tsx    (Pen-Infografik)
│   ├── HowItWorksSection.tsx  (3-Schritt-Anleitung)
│   ├── ProductsSection.tsx    (Produktraster + Filter)
│   │   └── useProducts.ts     (Hook: API + Fallback)
│   ├── TrustSection.tsx       (Vertrauenssignale)
│   ├── FaqSection.tsx         (FAQ-Akkordeon)
│   ├── Footer.tsx             (Links, Legal)
│   ├── StickyCtaBar.tsx       (Sticky Bottom-Bar)
│   ├── WhatsAppFloat.tsx      (Floating Button)
│   └── CookieBanner.tsx       (DSGVO Cookie-Consent)
├── /datenschutz
│   └── Datenschutz.tsx
└── /agb
    └── AGB.tsx
```

---

## Routing-System

**Kein Router-Framework.** Routing erfolgt direkt in `App.tsx` über `window.location.pathname`:

```tsx
// src/App.tsx (vereinfacht)
const path = window.location.pathname;

if (path === '/datenschutz') return <Datenschutz />;
if (path === '/agb') return <AGB />;
return <HomePage />; // Default: Landingpage
```

**Warum kein React Router?** Die Seite hat nur 3 Routen und soll so schlank wie möglich bleiben. React Router würde unnötige Bundle-Größe hinzufügen.

**SPA-Fallback:** Die Datei `public/_redirects` enthält:
```
/* /index.html 200
```
Dies ist kritisch — ohne diese Datei würden `/datenschutz` und `/agb` auf Netlify einen 404-Fehler erzeugen.

---

## Konfigurationssystem

Alle Konfigurationswerte kommen aus Umgebungsvariablen und werden zentral in `src/lib/config.ts` exponiert:

```typescript
// src/lib/config.ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  shopBaseUrl: import.meta.env.VITE_SHOP_BASE_URL || "https://www.369research.eu",
  plugplaySurcharge: Number(import.meta.env.VITE_PLUGPLAY_SURCHARGE ?? 15),
  penProductId: import.meta.env.VITE_PEN_PRODUCT_ID,
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER,
  siteUrl: import.meta.env.VITE_SITE_URL,
};

export const PEN_BUY_URL = `${config.shopBaseUrl}/plug-and-play`;
```

**Wichtig:** `PEN_BUY_URL` ist die einzige korrekte URL für alle "Pen kaufen"-Buttons. Niemals direkte URL-Strings in Komponenten hardcoden.

---

## Plug&Play-Eligibility-Logik

Die Logik, welche Produkte als Plug&Play Patronen angeboten werden, ist in `src/lib/plugPlayConfig.ts` definiert und muss **exakt identisch** mit dem Hauptshop `369research.eu` sein:

```typescript
// Ausgeschlossene Kategorien (keine Plug&Play Patrone)
export const PLUGPLAY_EXCLUDED_CATEGORIES = [
  "Forscher-Bundles", "369 BeautyLine", "Fertigpens",
  "Forscherpens", "Tabletten", "Kapseln / Tabletten",
  "Zubehör", "Nasensprays",
];

// Ausgeschlossene Produkt-IDs
export const PLUGPLAY_EXCLUDED_IDS = [
  "369-retinal-shot", "perfect-skin-bundle", "selank", ...
];

export function isPlugPlayEligible(product): boolean {
  // Prüft ID, Kategorie und Produkttyp
}
```

**Wenn im Hauptshop neue Produkte oder Kategorien hinzugefügt werden, müssen diese Listen synchronisiert werden.**

---

## Netlify-Konfiguration

`netlify.toml` steuert Build, Redirects, Headers und Functions:

```toml
[build]
  command = "npm install && npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"

[functions]
  node_bundler = "esbuild"

# Function-Routen
[[redirects]]
  from = "/sitemap.xml"
  to = "/.netlify/functions/sitemap"
  status = 200

[[redirects]]
  from = "/merchant-feed.xml"
  to = "/.netlify/functions/merchant-feed"
  status = 200

# SPA-Fallback (muss zuletzt stehen!)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Sicherheits-Header
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## CDN-Bilder

Alle Bilder sind auf `files.manuscdn.com` gehostet (Manus CDN). Sie werden direkt als URL-Strings in den Komponenten verwendet. Keine lokalen Bilddateien im Repo.

| Verwendung | Datei |
|---|---|
| Hero-Bild | `files.manuscdn.com/...` (in `HeroSection.tsx`) |
| Problem-Sektion | `files.manuscdn.com/...` (in `ProblemSection.tsx`) |
| Pen-Infografik | `files.manuscdn.com/...` (in `PenSystemBanner.tsx`) |
| Merchant Feed Fallback | `files.manuscdn.com/...` (in `merchant-feed.ts`) |

---

## Sicherheits-Architektur

- **Keine Secrets im Frontend:** Alle `VITE_`-Variablen sind öffentlich sichtbar im Build-Bundle. Keine API-Keys, keine Tokens.
- **Kein Backend-Schreibzugriff:** Der Railway-API-Client macht ausschließlich GET-Anfragen (tRPC queries, keine mutations).
- **CORS:** Railway erlaubt nur `peptidpen.de` und `369research.eu` als Origins.
- **Security Headers:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy via `netlify.toml`.
- **Keine crawlbaren E-Mail-Adressen:** Kontakt nur über Verweis auf 369research.eu Kontaktformular.

---

*Weiter: [COMPONENTS.md](COMPONENTS.md) — alle Komponenten im Detail.*
