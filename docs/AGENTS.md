# KI-Agenten-Guide — peptidpen.de

> **Dieser Guide ist speziell für KI-Agenten (Manus, Cursor, Copilot, Claude, etc.)** die an dieser Codebase weiterarbeiten. Lies diesen Guide vollständig, bevor du irgendwelche Änderungen vornimmst.

---

## Sofort-Orientierung

Du arbeitest an `peptidpen.de` — einer deutschen Produkt-Landingpage für den 369 Research Peptidpen.

| Was | Wert |
|---|---|
| Repo | `research369/peptidpen` |
| Branch | `main` |
| Live URL | `https://peptidpen.de` |
| Lokaler Pfad (wenn geklont) | `/tmp/peptidpen/` |
| Stack | React 18 + TypeScript + Vite + Tailwind + Netlify |
| Sprache | Deutsch (alle User-Texte) |

**Deployment:** Jeder Push auf `main` → automatischer Netlify-Deploy via GitHub Actions. Kein manueller Schritt nötig.

---

## Vor JEDER Änderung lesen

### 1. TypeScript muss bestehen

```bash
cd /tmp/peptidpen
npm install  # falls node_modules fehlen
npx tsc --noEmit
```

Wenn dieser Befehl Fehler ausgibt: **Nicht pushen.** Erst alle Fehler beheben.

### 2. Push-Workflow

```bash
# Token aus gespeicherter Datei lesen
GH_TOKEN=$(cat /home/ubuntu/.github_token | tr -d '\n')

# Committen
git add -A
git commit -m "typ: kurze beschreibung"

# Pushen mit Token
git push "https://${GH_TOKEN}@github.com/research369/peptidpen.git" main
```

**Token-Pfad:** `/home/ubuntu/.github_token` (gültig 30 Tage)

### 3. Commit-Message-Konventionen

| Präfix | Verwendung |
|---|---|
| `feat:` | Neue Funktion |
| `fix:` | Bugfix |
| `content:` | Textänderungen, FAQ, Copy |
| `seo:` | SEO-Änderungen |
| `docs:` | Dokumentation |
| `style:` | CSS/Design-Änderungen |
| `refactor:` | Code-Umstrukturierung ohne Funktionsänderung |

---

## Was du ändern KANNST

### FAQ-Fragen hinzufügen oder ändern

**Datei:** `src/components/FaqSection.tsx`

Einfach ein neues Objekt zum FAQ-Array hinzufügen:
```typescript
{ question: "Neue Frage?", answer: "Antwort hier..." }
```

**Danach auch aktualisieren:** `src/components/SchemaOrg.tsx` (FAQ-Daten für Google)

### Texte und Copy ändern

Alle User-facing Texte sind direkt in den Komponenten als JSX-Strings. Keine i18n-Bibliothek, kein CMS. Einfach die Strings in der jeweiligen Komponente ändern.

**Wichtig:** Immer auf Deutsch. Kein Englisch in User-Texten.

### Produkt-Ausschlusslisten aktualisieren

**Datei:** `src/lib/plugPlayConfig.ts`

Wenn neue Produkte im Hauptshop hinzugefügt werden, die KEINE Patrone bekommen sollen:
```typescript
export const PLUGPLAY_EXCLUDED_IDS = [
  // Neue ID hier hinzufügen:
  "neues-produkt-id",
  // ...
];
```

### Fallback-Produkte aktualisieren

**Datei:** `src/lib/fallbackProducts.ts`

Wenn neue Produkte im Hauptshop live gehen, sollten sie auch hier ergänzt werden. **Pflichtfelder:**
```typescript
{
  id: "produkt-id",
  shopProductId: "produkt-id",
  name: "Produktname",
  category: "Kategoriename",
  categories: ["Kategoriename"],  // MUSS vorhanden sein!
  price: 49.90,
  inStock: true,
  // ... alle anderen Felder aus ShopProduct Interface
}
```

### Neue FAQ-Sektion oder Seite hinzufügen

Neue Route in `src/App.tsx` nach dem gleichen Muster:
```typescript
if (path === '/neue-seite') return <><NeueSeite /><CookieBanner /></>;
```

Neue Seite in `src/pages/NeueSeite.tsx` anlegen.

### Styling und Design anpassen

Tailwind CSS Klassen direkt in den Komponenten ändern. Globale Stile in `src/index.css`.

---

## Was du NICHT ändern darfst

### ❌ Pen-Kauflinks

Alle "Pen kaufen"-Buttons müssen auf `PEN_BUY_URL` aus `config.ts` zeigen:
```typescript
import { PEN_BUY_URL } from "../lib/config";
// Korrekt:
<a href={PEN_BUY_URL}>Pen kaufen</a>
// FALSCH:
<a href="https://www.369research.eu/produkt/forscherpen">Pen kaufen</a>
```

### ❌ Betreiber-Angaben in rechtlichen Seiten

In `Datenschutz.tsx` und `AGB.tsx`:
- **Betreiber ist immer:** "369 Research, www.369research.eu, Deutschland"
- **Niemals:** Personennamen eintragen
- **Niemals:** `mailto:`-Links hinzufügen

### ❌ Gesundheitsversprechen

Folgende Formulierungen sind **verboten:**
- "heilt", "behandelt", "therapiert"
- "für Menschen geeignet" (ohne "Research Use Only"-Kontext)
- Dosierungsempfehlungen für Menschen
- Medizinische Wirkungsaussagen

**Immer verwenden:**
- "Research Use Only"
- "Ausschließlich für Forschungszwecke"
- "Nicht für den menschlichen Gebrauch bestimmt"

### ❌ E-Mail-Adressen im Frontend

Keine `mailto:`-Links. Kein direktes Anzeigen von E-Mail-Adressen. Kontakt immer über Verweis auf das Kontaktformular von 369research.eu.

### ❌ `public/_redirects` löschen

Diese Datei ist kritisch für das SPA-Routing auf Netlify. Ohne sie funktionieren `/datenschutz` und `/agb` nicht.

### ❌ Direkte URL-Strings für Shop-Links

Niemals Shop-URLs hardcoden. Immer `config.ts` verwenden:
```typescript
// Korrekt:
import { PEN_BUY_URL, getShopProductUrl } from "../lib/config";
getShopProductUrl(product.shopProductId)

// FALSCH:
"https://www.369research.eu/produkt/bpc-157"
```

---

## Häufige Aufgaben

### FAQ hinzufügen

1. `src/components/FaqSection.tsx` öffnen
2. Neues `{question, answer}`-Objekt zum Array hinzufügen
3. `src/components/SchemaOrg.tsx` aktualisieren (gleiche Frage/Antwort)
4. TypeScript-Check: `npx tsc --noEmit`
5. Pushen

### Neues Produkt zur Ausschlussliste hinzufügen

1. `src/lib/plugPlayConfig.ts` öffnen
2. Produkt-ID zu `PLUGPLAY_EXCLUDED_IDS` oder Kategorie zu `PLUGPLAY_EXCLUDED_CATEGORIES` hinzufügen
3. TypeScript-Check
4. Pushen

### Trust Banner Text ändern

**Datei:** `src/components/HeroSection.tsx`

Den Text im Trust Banner suchen:
```
🇩🇪 Entwickelt in DE · ❄️ 48h Gekühlter Versand · 1.000+ Kunden · Erfinder der Plug&Play Patrone
```
Direkt als String ändern.

### Neuen Abschnitt auf der Landingpage hinzufügen

1. Neue Komponente in `src/components/NeuerAbschnitt.tsx` anlegen
2. In `src/App.tsx` importieren und in der `HomePage`-Render-Funktion an der richtigen Stelle einfügen
3. TypeScript-Check
4. Pushen

### Umgebungsvariable hinzufügen

Siehe [DEPLOY.md](DEPLOY.md) — Abschnitt "Neue Umgebungsvariable hinzufügen".

---

## Brand-Richtlinien für KI-Agenten

Wenn du Texte generierst oder änderst, beachte:

| Regel | Beispiel |
|---|---|
| Immer "Research Use Only" | "Ausschließlich für Forschungszwecke" |
| Premium-Ton | Kein "günstig", kein "billig" |
| Wissenschaftlich korrekt | Keine Übertreibungen |
| Deutsch | Alle User-Texte auf Deutsch |
| Betreiber | Immer "369 Research" — niemals Personennamen |
| Keine Emojis in Fließtext | Nur im Trust Banner erlaubt |

**Verbotene Begriffe:**
- "heilt", "behandelt", "therapiert"
- "für Menschen" (ohne RUO-Kontext)
- Personennamen (Betreiber/Gründer)
- "WooCommerce" (369 Research hat ein eigenes Railway-Backend)

---

## Debugging-Hilfe

### Produkte werden nicht angezeigt

```bash
# Prüfen ob API erreichbar ist
curl "https://369-research-backend-production.up.railway.app/api/trpc/article.shopProducts" | head -100

# Wenn nicht erreichbar → Fallback greift automatisch
# Fallback-Daten prüfen:
cat src/lib/fallbackProducts.ts | grep -c "shopProductId"  # Sollte 33 sein
```

### TypeScript-Fehler

```bash
cd /tmp/peptidpen
npm install
npx tsc --noEmit 2>&1 | head -50
```

### Build-Fehler

```bash
npm run build 2>&1 | tail -30
```

### Routing funktioniert nicht (404 auf /datenschutz)

Prüfen ob `public/_redirects` existiert:
```bash
cat public/_redirects
# Sollte enthalten: /* /index.html 200
```

---

## Vollständiger Arbeitsablauf (Referenz)

```bash
# 1. Repo ist bereits geklont unter /tmp/peptidpen
cd /tmp/peptidpen

# 2. Abhängigkeiten installieren (falls nötig)
npm install

# 3. Änderungen vornehmen (Dateien bearbeiten)

# 4. TypeScript-Check — MUSS bestehen
npx tsc --noEmit

# 5. Build testen (optional, aber empfohlen)
npm run build

# 6. Committen
git add -A
git commit -m "feat: beschreibung"

# 7. Token laden und pushen
GH_TOKEN=$(cat /home/ubuntu/.github_token | tr -d '\n')
git push "https://${GH_TOKEN}@github.com/research369/peptidpen.git" main

# 8. Deploy-Status prüfen
# https://github.com/research369/peptidpen/actions
# Nach ~2 Minuten: https://peptidpen.de
```

---

## Dateien-Referenz (Schnellzugriff)

| Datei | Wofür |
|---|---|
| `src/App.tsx` | Routing ändern, neue Seiten hinzufügen |
| `src/lib/config.ts` | Konfiguration, URLs, Env-Vars |
| `src/lib/plugPlayConfig.ts` | Produkt-Ausschlusslisten |
| `src/lib/fallbackProducts.ts` | Statische Produkte aktualisieren |
| `src/components/FaqSection.tsx` | FAQ ändern/hinzufügen |
| `src/components/HeroSection.tsx` | Hero-Text, Trust Banner |
| `src/components/SchemaOrg.tsx` | SEO Structured Data |
| `src/pages/Datenschutz.tsx` | Datenschutzerklärung |
| `src/pages/AGB.tsx` | AGB |
| `netlify/functions/merchant-feed.ts` | Google Merchant Feed |
| `netlify/functions/sitemap.ts` | XML-Sitemap |
| `public/_redirects` | SPA-Routing (nicht löschen!) |
| `.github/workflows/deploy.yml` | CI/CD Pipeline |
| `netlify.toml` | Netlify-Konfiguration |

---

*Weitere Dokumentation: [README.md](../README.md) · [ARCHITECTURE.md](ARCHITECTURE.md) · [COMPONENTS.md](COMPONENTS.md) · [API.md](API.md) · [DEPLOY.md](DEPLOY.md)*
