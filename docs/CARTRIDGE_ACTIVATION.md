# 369 Plug&Play Patrone: Freigabe vor Verkaufsstart

Die Produktauswahl ist derzeit ein Designkatalog. Sie übernimmt nur Produktnamen
und Kategorien, keine Vial-Preise, Vial-Bestände, Vial-Stärken oder Vial-Kauflinks.
Die weiß-blauen Labels sind Bildschirmdarstellungen, keine freigegebenen Drucketiketten.

## Verbindliche Zuordnung je neuer Patrone

- eigener WaWi-Artikel und article ID
- eigene SKU je Stärke/Variante
- tatsächliche shopProductId, nicht die Vial-Route
- freigegebener Endpreis in EUR
- tatsächlicher Bestand und Bestandsführung für die Patrone
- freigegebene Stärke, Produktlabel und Produktbeschreibung

Erst mit diesen Daten wird eine explizite Patronen-Zuordnung eingerichtet.
Fehlende Zuordnungen bleiben nicht bestellbar. Keine Ableitung aus Namen,
Vial-SKUs oder genereller Eignung eines Produkts.

## Rabattstaffel

15 % ab 5, 20 % ab 10, 25 % ab 20, 35 % ab 40 Stück.
Diese Staffel ist im Frontend nur dargestellt. Vor Veröffentlichung separat im
Shop/Staging für die neuen Patronen prüfen; bestehende globale Rabattregeln nicht
ohne Freigabe verändern. Testbestellungen einschließlich Checkout, Zahlung,
Lagerabzug und Varianten-Zuordnung prüfen.

## Travel Tube

Verbindlich bestätigt: eine Travel Tube kostenlos pro 369 Plug&Play Patrone als
Versandschutz. Zusätzlich einzeln: 5 EUR pro Stück. Die Preview leitet kostenlose
Tubes aus der Patronenmenge ab, speichert sie nicht als bezahlte Position und
unterscheidet sie von zusätzlich gewählten Tubes. Vor Verkaufsfreigabe muss der
Server dieselbe Regel prüfen und kostenlose wie bezahlte Tubes gegen den echten
Tube-Artikelbestand buchen. Die Preview löst keinerlei Lagerbewegung aus.

## Abschlussprüfung

Nach erfolgter WaWi-Zuordnung Preise/Bestände/Kauflinks aktivieren und anschließend
strukturierte Produktangebote und Merchant-Feed ausschließlich aus diesen
bestätigten Patronendatensätzen erzeugen. Preview prüfen, PR freigeben, erst danach
veröffentlichen und Produktion kontrollieren.
