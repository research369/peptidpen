# Komponenten-Dokumentation — peptidpen.de

> **Für externe Entwickler und KI-Agenten** — jede Komponente mit Zweck, Props und Verhalten.

---

## Übersicht

Alle Komponenten befinden sich in `src/components/` (wiederverwendbare UI-Sektionen) und `src/pages/` (vollständige Seiten). Es gibt keine Prop-Drilling-Kette — jede Komponente ist weitgehend eigenständig und holt sich ihre Daten selbst (über den `useProducts`-Hook oder direkt aus `config.ts`).

---

## `App.tsx` — Root-Komponente & Router

**Pfad:** `src/App.tsx`

Steuert das URL-basierte Routing und rendert entweder die Landingpage oder eine der rechtlichen Seiten. Bindet außerdem `CookieBanner` ein, der auf allen Seiten erscheint.

```tsx
// Routing-Logik (vereinfacht)
const path = window.location.pathname;
if (path === '/datenschutz') return <><Datenschutz /><CookieBanner /></>;
if (path === '/agb') return <><AGB /><CookieBanner /></>;
return <HomePage />; // Alle anderen Pfade → Landingpage
```

**Was hier NICHT geändert werden sollte:** Die Routing-Logik selbst. Neue Seiten können nach dem gleichen Muster hinzugefügt werden.

---

## `AgeGateModal.tsx` — Altersverifikation

**Pfad:** `src/components/AgeGateModal.tsx`

Zeigt beim ersten Besuch ein Modal, das den Nutzer auffordert, sein Alter zu bestätigen (18+). Wird im `localStorage` gespeichert, damit das Modal nicht bei jedem Seitenaufruf erscheint.

**Verhalten:**
- Beim ersten Besuch: Modal blockiert die gesamte Seite
- Nach Bestätigung: `localStorage.setItem('ageVerified', 'true')` — Modal erscheint nicht mehr
- Ablehnen: Weiterleitung auf eine externe Seite

**Wichtig:** Das Modal muss immer angezeigt werden, bevor andere Inhalte sichtbar sind. Die Reihenfolge in `App.tsx` darf nicht geändert werden.

---

## `CookieBanner.tsx` — DSGVO Cookie-Consent

**Pfad:** `src/components/CookieBanner.tsx`

DSGVO-konfortes Cookie-Consent-Banner. Erscheint beim ersten Besuch am unteren Bildschirmrand.

**Verhalten:**
- Zeigt "Akzeptieren" und "Ablehnen"-Buttons
- Speichert Entscheidung in `localStorage` (`cookieConsent: 'accepted' | 'rejected'`)
- Verschwindet nach Entscheidung dauerhaft
- Enthält Link zur `/datenschutz`-Seite

**Compliance-Hinweis:** Dieses Banner ist für die DSGVO-Konformität erforderlich. Nicht entfernen oder vereinfachen.

---

## `HeroSection.tsx` — Hero + Trust Banner

**Pfad:** `src/components/HeroSection.tsx`

Die erste sichtbare Sektion der Landingpage. Enthält:

- **Trust Banner** (oben): `🇩🇪 Entwickelt in DE · ❄️ 48h Gekühlter Versand · 1.000+ Kunden · Erfinder der Plug&Play Patrone`
- **Headline** und Subheadline
- **Hero-Bild** (CDN)
- **CTA-Buttons:** "Pen kaufen" → `PEN_BUY_URL` | "Patronen entdecken" → `#products`

**Wichtig:** Alle CTA-Buttons müssen auf `PEN_BUY_URL` aus `config.ts` zeigen, niemals auf direkte URLs.

---

## `ProblemSection.tsx` — Problem/Lösung

**Pfad:** `src/components/ProblemSection.tsx`

Erklärt das Problem (herkömmliche Peptid-Anwendung ist kompliziert) und positioniert den Peptidpen als Lösung. Enthält ein CDN-Bild und CTA-Buttons.

**Compliance:** Keine medizinischen Aussagen. Nur "Research Use Only"-Framing.

---

## `PenSystemBanner.tsx` — Pen-Infografik

**Pfad:** `src/components/PenSystemBanner.tsx`

Vollbreite Banner-Sektion mit einer Infografik, die das Pen-System visualisiert (Pen + Patrone = fertig). Enthält einen "Pen kaufen"-Button → `PEN_BUY_URL`.

---

## `HowItWorksSection.tsx` — So funktioniert's

**Pfad:** `src/components/HowItWorksSection.tsx`

3-Schritt-Anleitung: Pen kaufen → Patrone wählen → Einsetzen & fertig. Jeder Schritt hat einen CTA-Button.

**Schritt 1 und 3:** Buttons → `PEN_BUY_URL`  
**Schritt 2:** Button → `#products` (Anker zur Produktsektion)

---

## `ProductsSection.tsx` — Produktraster

**Pfad:** `src/components/ProductsSection.tsx`

Die zentrale Produktsektion. Zeigt alle Plug&Play-fähigen Peptidpatronen in einem Raster mit Kategorie-Filter.

**Datenquelle:** `useProducts`-Hook (API + Fallback)

**Features:**
- Kategorie-Filter-Tabs (dynamisch aus Produktdaten)
- Produktkarten mit Name, Preis, Kategorie-Badge
- "Patrone kaufen"-Button pro Produkt → `getShopProductUrl(shopProductId)` aus `config.ts`
- Fallback-Banner wenn API nicht erreichbar

**Wichtig:** Produkte werden immer als "Patrone" dargestellt — nie als Vial oder Pulver. Der angezeigte Preis ist immer `Basispreis + plugplaySurcharge`.

---

## `TrustSection.tsx` — Vertrauenssignale

**Pfad:** `src/components/TrustSection.tsx`

Zeigt Trust-Signale: Entwickelt in Deutschland, gekühlter Versand, Qualitätszertifikate, Kundenstimmen (keine gefälschten Reviews — nur allgemeine Trust-Aussagen).

**Compliance:** Keine spezifischen Kundenbewertungen oder Testimonials mit Namen einfügen.

---

## `FaqSection.tsx` — FAQ

**Pfad:** `src/components/FaqSection.tsx`

Akkordeon-FAQ mit allen wichtigen Fragen zum Peptidpen-System. Aktuelle Fragen:

| Frage | Kategorie |
|---|---|
| Was ist der Peptidpen? | Produkt |
| Wie funktioniert die Plug&Play Patrone? | Produkt |
| Welche Peptide sind als Patrone verfügbar? | Produkt |
| Wie wird der Pen geliefert? | Versand |
| Gekühlter Versand — wie funktioniert das? | Versand |
| Welche Zahlungsarten werden akzeptiert? | Zahlung |
| Kann ich den Pen zurückgeben? | Rückgabe |
| Ist der Peptidpen für Menschen geeignet? | Compliance |

**Compliance:** Die FAQ-Antwort zu "Ist der Peptidpen für Menschen geeignet?" muss immer klar "Research Use Only" kommunizieren.

**Neue FAQs hinzufügen:** Einfach ein neues `{question, answer}`-Objekt zum Array in der Komponente hinzufügen.

---

## `Footer.tsx` — Footer

**Pfad:** `src/components/Footer.tsx`

Enthält:
- 369 Research Logo/Name
- Links: `/datenschutz`, `/agb`
- Verweis auf `369research.eu`
- Copyright-Zeile

**Wichtig:** Keine persönlichen Namen, keine crawlbaren E-Mail-Adressen.

---

## `StickyCtaBar.tsx` — Sticky CTA-Leiste

**Pfad:** `src/components/StickyCtaBar.tsx`

Erscheint am unteren Bildschirmrand, wenn der Nutzer nach unten scrollt. Enthält einen prominenten "Pen kaufen"-Button → `PEN_BUY_URL`.

**Verhalten:** Wird nach einem bestimmten Scroll-Offset eingeblendet (via `IntersectionObserver` oder `scroll`-Event).

---

## `WhatsAppFloat.tsx` — Floating WhatsApp-Button

**Pfad:** `src/components/WhatsAppFloat.tsx`

Grüner Floating-Button unten rechts. Öffnet WhatsApp mit vorausgefüllter Nachricht.

**URL:** `getWhatsAppUrl()` aus `config.ts` → `https://wa.me/${whatsappNumber}?text=...`

**Compliance:** Die vorausgefüllte Nachricht darf keine medizinischen Aussagen enthalten.

---

## `SchemaOrg.tsx` — Structured Data

**Pfad:** `src/components/SchemaOrg.tsx`

Rendert JSON-LD Structured Data für Suchmaschinen. Enthält:

- `Organization` (369 Research)
- `Product` (Peptidpen)
- `FAQPage` (aus FaqSection)
- `WebPage`

**Kein sichtbares UI** — nur `<script type="application/ld+json">` Tags im `<head>`.

**Wichtig:** Wenn FAQs geändert werden, muss `SchemaOrg.tsx` ebenfalls aktualisiert werden, damit Google die korrekten FAQ-Daten indexiert.

---

## `useProducts.ts` — Produkt-Hook

**Pfad:** `src/hooks/useProducts.ts`

Zentraler Hook für alle Produktdaten. Gibt zurück:

```typescript
{
  products: ShopProduct[];      // Gefilterte Plug&Play-Produkte
  penProduct: ShopProduct | null; // Pen-Produkt (für Preis)
  loading: boolean;
  error: string | null;
  usingFallback: boolean;       // true wenn API nicht erreichbar
}
```

**Fallback-Logik:**
1. Versucht `fetchPlugPlayProducts()` aus `api.ts`
2. Bei Fehler: Lädt `fallbackProducts.ts` und filtert mit `isPlugPlayEligible()`
3. Setzt `usingFallback: true` → `ProductsSection` zeigt entsprechenden Hinweis

---

## `pages/Datenschutz.tsx` — Datenschutzerklärung

**Pfad:** `src/pages/Datenschutz.tsx`

Vollständige DSGVO-Datenschutzerklärung. Erreichbar unter `/datenschutz`.

**Betreiber:** 369 Research, www.369research.eu, Deutschland  
**Kontakt:** Nur über Kontaktformular auf 369research.eu (keine crawlbare E-Mail)

**Wichtig:** Niemals persönliche Namen eintragen. Niemals `mailto:`-Links hinzufügen.

---

## `pages/AGB.tsx` — Allgemeine Geschäftsbedingungen

**Pfad:** `src/pages/AGB.tsx`

Allgemeine Geschäftsbedingungen. Erreichbar unter `/agb`.

**Vertragspartner:** 369 Research (www.369research.eu), Deutschland

**Wichtig:** Gleiche Regeln wie `Datenschutz.tsx` — keine persönlichen Namen, keine crawlbaren E-Mails.

---

*Weiter: [API.md](API.md) — Backend-Integration und Fallback-Strategie.*
