# Deployment-Guide — peptidpen.de

> **Für externe Entwickler und KI-Agenten** — vollständige Anleitung für Deployment und CI/CD.

---

## Überblick

`peptidpen.de` wird automatisch über **GitHub Actions** auf **Netlify** deployed. Jeder Push auf den `main`-Branch löst einen neuen Build und Deploy aus.

```
Push auf main
    │
    ▼
GitHub Actions (.github/workflows/deploy.yml)
    │
    ├── npm ci
    ├── npm run build (mit VITE_* Secrets)
    └── nwtgck/actions-netlify@v3.0
            │
            ▼
        Netlify CDN
            │
            ▼
        peptidpen.de (Production)
```

---

## GitHub Actions Workflow

**Datei:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_SHOP_URL: ${{ secrets.VITE_SHOP_URL }}
          VITE_SITE_URL: ${{ secrets.VITE_SITE_URL }}
          VITE_WHATSAPP_NUMBER: ${{ secrets.VITE_WHATSAPP_NUMBER }}
      
      - name: Deploy to Netlify (Production)
        if: github.ref == 'refs/heads/main'
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: './dist'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      
      - name: Deploy to Netlify (Preview)
        if: github.ref != 'refs/heads/main'
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: './dist'
          production-deploy: false
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**Verhalten:**
- `main`-Branch → Production Deploy auf `peptidpen.de`
- Pull Requests → Preview Deploy (temporäre Netlify-URL)

---

## Erforderliche GitHub Secrets

Diese Secrets müssen im GitHub Repository unter **Settings → Secrets and variables → Actions** eingetragen sein:

| Secret | Beschreibung | Beispiel |
|---|---|---|
| `VITE_API_BASE_URL` | Railway Backend URL | `https://369-research-backend-production.up.railway.app` |
| `VITE_SHOP_URL` | Hauptshop URL | `https://www.369research.eu` |
| `VITE_SITE_URL` | Diese Domain | `https://peptidpen.de` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp-Nummer | `4915512345678` |
| `NETLIFY_AUTH_TOKEN` | Netlify Personal Access Token | `nfp_...` |
| `NETLIFY_SITE_ID` | Netlify Site ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

> **Hinweis:** `VITE_PLUGPLAY_SURCHARGE` und `VITE_PEN_PRODUCT_ID` sind optional — es gibt Standardwerte in `config.ts`.

---

## Netlify-Konfiguration

**Datei:** `netlify.toml`

Wichtige Einstellungen:

| Einstellung | Wert | Zweck |
|---|---|---|
| `build.command` | `npm install && npm run build` | Build-Befehl |
| `build.publish` | `dist` | Output-Verzeichnis |
| `build.functions` | `netlify/functions` | Serverless Functions |
| `NODE_VERSION` | `20` | Node.js Version |
| `node_bundler` | `esbuild` | Functions-Bundler |

**Kritische Redirects (Reihenfolge beachten!):**
1. `/sitemap.xml` → `/.netlify/functions/sitemap` (200)
2. `/merchant-feed.xml` → `/.netlify/functions/merchant-feed` (200)
3. `/*` → `/index.html` (200) — **SPA-Fallback, muss zuletzt stehen**

---

## SPA-Fallback (`public/_redirects`)

**Kritisch:** Diese Datei muss immer vorhanden sein.

```
/* /index.html 200
```

Ohne diese Datei würden `/datenschutz` und `/agb` auf Netlify einen 404-Fehler erzeugen, da Netlify keine serverseitige Routing-Logik hat.

> **Hinweis:** `netlify.toml` enthält ebenfalls einen SPA-Fallback-Redirect. Die `_redirects`-Datei ist eine zusätzliche Absicherung.

---

## Manueller Deploy (Notfall)

Falls GitHub Actions nicht verfügbar ist, kann manuell über die Netlify CLI deployed werden:

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Einloggen
netlify login

# Build erstellen (mit lokaler .env)
npm run build

# Production Deploy
netlify deploy --prod --dir=dist --site=<NETLIFY_SITE_ID>
```

---

## Deploy via Git Push (Standard-Workflow)

```bash
# TypeScript-Check MUSS vor dem Push bestehen
npx tsc --noEmit

# Wenn kein Fehler: committen und pushen
git add -A
git commit -m "feat: beschreibung der änderung"
git push origin main

# GitHub Actions startet automatisch
# Deploy-Status: https://github.com/research369/peptidpen/actions
```

---

## Deploy-Status prüfen

- **GitHub Actions:** `https://github.com/research369/peptidpen/actions`
- **Netlify Dashboard:** `https://app.netlify.com`
- **Live-Check:** `https://peptidpen.de` (nach ~2 Minuten)

---

## Häufige Deploy-Fehler

| Fehler | Ursache | Lösung |
|---|---|---|
| TypeScript-Fehler im Build | Typen nicht korrekt | `npx tsc --noEmit` lokal ausführen und Fehler beheben |
| `VITE_*` Variable undefined | Secret nicht gesetzt | GitHub Secrets prüfen |
| 404 auf `/datenschutz` | `_redirects` fehlt | `public/_redirects` mit `/* /index.html 200` anlegen |
| Function Timeout | Railway API langsam | Fallback greift automatisch |
| `nwtgck/actions-netlify` Fehler | `NETLIFY_SITE_ID` falsch | Site ID im Netlify Dashboard prüfen |

---

## Neue Umgebungsvariable hinzufügen

1. Variable in `src/lib/config.ts` hinzufügen:
   ```typescript
   myNewVar: import.meta.env.VITE_MY_NEW_VAR as string,
   ```
2. In `.env.example` dokumentieren
3. Als GitHub Secret eintragen: **Settings → Secrets → Actions → New repository secret**
4. In `.github/workflows/deploy.yml` im `Build`-Step hinzufügen:
   ```yaml
   VITE_MY_NEW_VAR: ${{ secrets.VITE_MY_NEW_VAR }}
   ```

---

*Weiter: [AGENTS.md](AGENTS.md) — KI-Agenten-Guide.*
