# peptidpen.de — Developer Documentation

> **Für externe Entwickler und KI-Agenten** — alles, was nötig ist, um sofort an dieser Codebase weiterzuarbeiten.

[![Live](https://img.shields.io/badge/Live-peptidpen.de-00C7B7)](https://peptidpen.de)
[![Repo](https://img.shields.io/badge/GitHub-research369%2Fpeptidpen-181717?logo=github)](https://github.com/research369/peptidpen)
[![Deploy](https://img.shields.io/badge/Deploy-Netlify%20via%20GitHub%20Actions-00C7B7?logo=netlify)](https://app.netlify.com)

**Live URL:** [https://peptidpen.de](https://peptidpen.de)  
**Backup URL:** [https://peptidpen.netlify.app](https://peptidpen.netlify.app)  
**GitHub Repo:** `research369/peptidpen` · Branch: `main`

---

## Was ist dieses Projekt?

`peptidpen.de` ist die deutsche Produkt-Landingpage für den **369 Research Peptidpen** — einen wiederverwendbaren Forscherpen mit Plug&Play-Peptidpatronen. Die Seite präsentiert das Produktsystem, listet alle kompatiblen Peptidpatronen (synchronisiert mit dem Hauptshop) und leitet Käufer auf [369research.eu/plug-and-play](https://www.369research.eu/plug-and-play) weiter.

**Dies ist eine reine Marketing-Landingpage.** Kein Checkout, keine Benutzerkonten, kein CMS. Alle Käufe laufen über [369research.eu](https://www.369research.eu).

---

## Tech Stack

| Schicht | Technologie |
|---|---|
| Framework | React 18 + TypeScript |
| Build-Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | Custom URL-basiert (keine Router-Bibliothek) |
| State | React Hooks only (kein Redux/Zustand) |
| Hosting | Netlify (Auto-Deploy via GitHub Actions) |
| Functions | Netlify Functions (esbuild) |
| Backend API | Railway (tRPC, read-only) |
| Node-Version | 20 |

---

## Quick Start

```bash
# 1. Repository klonen
git clone https://github.com/research369/peptidpen.git
cd peptidpen

# 2. Abhängigkeiten installieren
npm install

# 3. Umgebungsvariablen kopieren
cp .env.example .env
# → Werte eintragen (siehe Abschnitt "Umgebungsvariablen" unten)

# 4. Dev-Server starten
npm run dev
# → Öffnet http://localhost:5173
```

### Verfügbare Scripts

| Befehl | Beschreibung |
|---|---|
| `npm run dev` | Vite Dev-Server starten (Hot Reload) |
| `npm run build` | TypeScript-Check + Production Build nach `dist/` |
| `npm run preview` | Production Build lokal vorschauen |
| `npx tsc --noEmit` | Nur TypeScript-Check (kein Build) |

---

## Umgebungsvariablen

Alle Variablen sind mit `VITE_` präfixiert und werden beim Build in das statische Bundle eingebettet. **Niemals `.env` committen.**

Datei `.env` im Projektstamm anlegen:

```env
# Railway Backend — tRPC API für Produktdaten
VITE_API_BASE_URL=https://369-research-backend-production.up.railway.app

# Hauptshop-URL — für alle Produktlinks und Kauf-Buttons
VITE_SHOP_BASE_URL=https://www.369research.eu

# Kanonische URL dieser Seite — für SEO/og:url
VITE_SITE_URL=https://peptidpen.de

# WhatsApp-Kontaktnummer (ohne +, ohne Leerzeichen, z.B. 4915112345678)
VITE_WHATSAPP_NUMBER=<nummer>

# Plug&Play-Aufpreis auf den Peptid-Basispreis in Euro (Standard: 15)
VITE_PLUGPLAY_SURCHARGE=15

# Shop-Produkt-ID des Pens (für dynamische Pen-Preisanzeige)
VITE_PEN_PRODUCT_ID=forscherpen
```

> **Hinweis:** In der Produktion sind diese Werte als **GitHub Secrets** gespeichert und werden im GitHub Actions Build-Schritt injiziert. Details: [docs/DEPLOY.md](docs/DEPLOY.md).

---

## Projektstruktur

```
peptidpen/
├── src/
│   ├── App.tsx                   # Root-Komponente + URL-basiertes Routing
│   ├── main.tsx                  # React Entry Point
│   ├── index.css                 # Tailwind Base Styles
│   ├── components/               # Alle UI-Sektionen
│   │   ├── AgeGateModal.tsx      # Altersverifikation (beim ersten Besuch)
│   │   ├── CookieBanner.tsx      # DSGVO Cookie-Consent
│   │   ├── HeroSection.tsx       # Hero + Trust Banner + CTAs
│   │   ├── ProblemSection.tsx    # Problem/Lösung-Sektion
│   │   ├── PenSystemBanner.tsx   # Vollbreite Pen-Infografik
│   │   ├── HowItWorksSection.tsx # Schritt-für-Schritt-Anleitung
│   │   ├── ProductsSection.tsx   # Produktraster mit Kategorie-Filter
│   │   ├── TrustSection.tsx      # Vertrauenssignale / Social Proof
│   │   ├── FaqSection.tsx        # FAQ-Akkordeon
│   │   ├── Footer.tsx            # Footer mit rechtlichen Links
│   │   ├── StickyCtaBar.tsx      # Sticky Bottom-CTA-Leiste
│   │   ├── WhatsAppFloat.tsx     # Floating WhatsApp-Button
│   │   └── SchemaOrg.tsx         # Schema.org Structured Data (JSON-LD)
│   ├── hooks/
│   │   └── useProducts.ts        # Produktdaten von API mit Fallback
│   ├── lib/
│   │   ├── api.ts                # API-Client (tRPC-Queries an Railway)
│   │   ├── config.ts             # Zentrale Konfiguration aus Env-Vars
│   │   ├── fallbackProducts.ts   # Statischer Fallback (33 Produkte)
│   │   └── plugPlayConfig.ts     # Plug&Play-Eligibility-Logik
│   └── pages/
│       ├── Datenschutz.tsx       # DSGVO-Datenschutzerklärung
│       └── AGB.tsx               # Allgemeine Geschäftsbedingungen
├── netlify/
│   └── functions/
│       ├── sitemap.ts            # /sitemap.xml Generator
│       └── merchant-feed.ts      # /merchant-feed.xml (Google Merchant)
├── public/
│   ├── _redirects                # Netlify SPA-Fallback (kritisch!)
│   ├── robots.txt
│   └── favicon.ico
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: Build + Netlify Deploy
├── netlify.toml                  # Netlify Build-Config + Headers + Redirects
├── .env.example                  # Vorlage für Umgebungsvariablen
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── docs/                         # Entwickler-Dokumentation
    ├── ARCHITECTURE.md           # System-Architektur und Datenfluss
    ├── COMPONENTS.md             # Alle Komponenten dokumentiert
    ├── API.md                    # Backend-API und Fallback-Strategie
    ├── DEPLOY.md                 # Deployment-Guide
    └── AGENTS.md                 # KI-Agenten-Guide (was ändern, was nicht)
```

---

## Routing

Dieses Projekt verwendet **keine Router-Bibliothek**. Das Routing wird manuell in `src/App.tsx` über `window.location.pathname` gesteuert:

| Pfad | Komponente |
|---|---|
| `/` | Vollständige Landingpage (alle Sektionen) |
| `/datenschutz` | `<Datenschutz />` — DSGVO-Datenschutzerklärung |
| `/agb` | `<AGB />` — Allgemeine Geschäftsbedingungen |

Die Datei `public/_redirects` sorgt dafür, dass Netlify für alle Routen `index.html` ausliefert (SPA-Fallback). **Diese Datei niemals löschen.**

---

## Wichtige Business-Regeln

Diese Regeln sind nicht verhandelbar und müssen bei allen Änderungen eingehalten werden:

1. **"Research Use Only"** — Alle Inhalte müssen dieses Framing verwenden. Keine Gesundheitsversprechen, keine medizinischen Aussagen, keine Dosierungsanweisungen für Menschen.
2. **Betreiber ist "369 Research"** — Niemals Personennamen in rechtlichen Seiten oder öffentlichen Inhalten verwenden.
3. **Alle Pen-Kauflinks** → `https://www.369research.eu/plug-and-play` (via `PEN_BUY_URL` in `config.ts`).
4. **E-Mail-Adressen dürfen nicht crawlbar sein** — Keine `mailto:`-Links. Stattdessen auf das Kontaktformular von 369research.eu verweisen.
5. **Kategorien müssen mit 369research.eu übereinstimmen** — Die Ausschlusslisten in `plugPlayConfig.ts` müssen mit dem Hauptshop synchron bleiben.
6. **TypeScript muss vor jedem Push bestehen** — `npx tsc --noEmit` ausführen und alle Fehler beheben, bevor committet wird.

---

## Weiterführende Dokumentation

| Dokument | Inhalt |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System-Architektur, Datenfluss, Komponenten-Baum |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | Jede Komponente: Zweck, Props, Verhalten |
| [docs/API.md](docs/API.md) | Railway-Backend, tRPC-Queries, Fallback-Strategie |
| [docs/DEPLOY.md](docs/DEPLOY.md) | GitHub Actions, Netlify-Config, Secrets, manueller Deploy |
| [docs/AGENTS.md](docs/AGENTS.md) | **KI-Agenten-Guide** — was ändern, was NICHT anfassen, häufige Aufgaben |

---

## Marke & Compliance

- **Marke:** 369 Research — Premium Research Compounds
- **Tagline:** Precision. Purity. Performance.
- **Design:** Dunkelblau / Gold, Premium-Biotech-Ästhetik
- **Sprache:** Deutsch (DE) — alle nutzerorientierten Texte müssen auf Deutsch sein
- **Compliance:** Alle Inhalte sind "Research Use Only" (RUO). Keine Gesundheitsversprechen erlaubt.

---

*Diese Dokumentation wurde für `research369/peptidpen` erstellt — gepflegt von 369 Research.*
