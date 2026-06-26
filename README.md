# peptidpen.de — Hochkonversions-Landingpage

Eigenständige Landingpage für den ersten wiederverwendbaren Peptid-Pen Europas.

## Tech Stack

- **Frontend:** Vite 5 + React 19 + TypeScript + Tailwind CSS 3
- **Hosting:** Netlify (Auto-Deploy via GitHub)
- **API:** 369 Research Backend (Railway) — nur lesender Zugriff
- **Functions:** Netlify Functions (Sitemap, Merchant Feed)

## Architektur

Diese Seite ist vollständig **isoliert** von 369research.eu und der WaWi. Sie:
- liest Produktdaten nur-lesend über die öffentliche Shop-API
- verlinkt für den Kauf direkt auf 369research.eu (Bestandsabzug läuft dort wie gewohnt)
- hat keinen eigenen Checkout, keine eigene Datenbank, keine eigene Auth

## Umgebungsvariablen

Alle Konfigurationswerte laufen über Umgebungsvariablen — **kein Hardcoding**.

| Variable | Beschreibung | Beispiel |
|---|---|---|
| `VITE_API_BASE_URL` | Railway Backend URL | `https://369-research-backend-production.up.railway.app` |
| `VITE_SHOP_BASE_URL` | Hauptshop URL | `https://www.369research.eu` |
| `VITE_SITE_URL` | Diese Domain | `https://www.peptidpen.de` |
| `VITE_PLUGPLAY_SURCHARGE` | Patronen-Aufpreis in € | `15` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp Kontaktnummer | `4915510063537` |
| `VITE_PEN_PRODUCT_ID` | WooCommerce ID des Pens | `123` |

Kopiere `.env.example` nach `.env` und fülle die Werte aus.

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
pnpm install

# Entwicklungsserver starten
pnpm dev

# TypeScript-Check
pnpm tsc --noEmit

# Production Build
pnpm build
```

## Deployment

Automatisch via Netlify bei jedem Push auf `main`.

**Manueller Deploy-Trigger:**
```bash
# Netlify CLI
netlify deploy --prod
```

## SEO & Merchant

- **Sitemap:** `https://www.peptidpen.de/sitemap.xml` (dynamisch via Netlify Function)
- **Merchant Feed:** `https://www.peptidpen.de/merchant-feed.xml` (Google Shopping)
- **robots.txt:** `https://www.peptidpen.de/robots.txt`

## Produkt-Logik

Nur Produkte mit `isPlugPlayEligible: true` aus der API werden angezeigt.
Alle werden ausschließlich als Patrone dargestellt — kein Vial, kein Pulver.
Preis = Basispreis + `VITE_PLUGPLAY_SURCHARGE` (aus Env-Variable).

## Struktur

```
src/
  components/     ← UI-Komponenten (eine pro Sektion)
  hooks/          ← useProducts Hook
  lib/
    api.ts        ← API-Calls zum Backend
    config.ts     ← Alle Env-Variablen zentral
    plugPlayConfig.ts ← Patronen-Eligibility-Logik
netlify/
  functions/      ← Sitemap + Merchant Feed
public/
  robots.txt
  favicon.svg
```

## Impressum

BEDO Holding GmbH  
Geschäftsführer/in D.K. Rabah  
Klingenhagen 31, 48336 Sassenberg
