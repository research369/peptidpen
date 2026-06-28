/**
 * Allgemeine Geschäftsbedingungen — peptidpen.de
 * Research Use Only — 369 Research
 */
export default function AGB() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-dark py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors"
          >
            ← Zurück zur Startseite
          </a>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-blue-200/60 mt-2 text-sm">
            Stand: Juni 2025 · peptidpen.de / 369research.eu
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          {/* RUO-Hinweis prominent */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-bold text-amber-800 mb-1">Research Use Only (RUO)</p>
                <p className="text-amber-700 text-sm">
                  Alle über 369 Research / peptidpen.de angebotenen Produkte sind
                  <strong> ausschließlich für wissenschaftliche Forschungszwecke</strong> bestimmt.
                  Sie sind nicht zur Diagnose, Behandlung, Heilung oder Vorbeugung von
                  Krankheiten beim Menschen oder Tier bestimmt. Kein Widerrufsrecht
                  für Forschungschemikalien (§ 312g Abs. 2 Nr. 2 BGB).
                </p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen,
              die über den Onlineshop unter <a href="https://www.369research.eu" className="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">www.369research.eu</a> aufgegeben werden.
              Die Website peptidpen.de dient ausschließlich der Produktpräsentation und
              leitet Bestellungen an den Hauptshop weiter.
            </p>
            <p className="mt-3">
              Vertragspartner ist 369 Research (<a href="https://www.369research.eu" className="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">www.369research.eu</a>), Deutschland.
              Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn,
              wir stimmen ihrer Geltung ausdrücklich schriftlich zu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 2 Vertragsschluss</h2>
            <p>
              Die Darstellung der Produkte im Onlineshop stellt kein rechtlich bindendes
              Angebot, sondern eine Aufforderung zur Bestellung dar. Durch Absenden der
              Bestellung gibt der Käufer ein verbindliches Angebot ab. Die Annahme erfolgt
              durch eine Auftragsbestätigung per E-Mail oder durch Lieferung der Ware.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 3 Research Use Only — Kaufvoraussetzungen</h2>
            <p>
              Der Kauf unserer Produkte setzt voraus, dass der Käufer:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2 text-sm">
              <li>Mindestens 18 Jahre alt ist</li>
              <li>Die Produkte ausschließlich zu Forschungszwecken erwirbt</li>
              <li>Bestätigt, dass die Produkte nicht zur menschlichen oder tierischen Anwendung bestimmt sind</li>
              <li>Die geltenden nationalen Gesetze und Vorschriften seines Landes kennt und einhält</li>
              <li>Über die notwendige wissenschaftliche Qualifikation für den Umgang mit den Produkten verfügt</li>
            </ul>
            <p className="mt-3">
              Mit jeder Bestellung bestätigt der Käufer ausdrücklich, diese Voraussetzungen
              zu erfüllen. Bei Verstoß gegen diese Bedingungen behält sich 369 Research
              das Recht vor, Bestellungen abzulehnen oder zu stornieren.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 4 Preise und Zahlung</h2>
            <p>
              Alle Preise verstehen sich in Euro (€) und sind Nettopreise zzgl. der
              gesetzlichen Mehrwertsteuer sowie ggf. anfallender Versandkosten.
            </p>
            <p className="mt-3">
              Folgende Zahlungsarten stehen zur Verfügung:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Banküberweisung (SEPA) — Bunq Bank</li>
              <li>Kreditkarte (bis 500 €) — über Bunq-Zahlungslink</li>
              <li>Internationale Überweisung — Wise</li>
            </ul>
            <p className="mt-3">
              Die Ware wird erst nach vollständigem Zahlungseingang versandt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 5 Lieferung und Versand</h2>
            <p>
              Lieferungen erfolgen ausschließlich innerhalb der Europäischen Union.
              Die Lieferzeit beträgt in der Regel 3–7 Werktage nach Zahlungseingang.
              Der Versand erfolgt per DHL oder einem vergleichbaren Paketdienstleister.
            </p>
            <p className="mt-3">
              Der Käufer ist für die Einhaltung der Einfuhrbestimmungen seines Landes
              selbst verantwortlich. 369 Research übernimmt keine Haftung für Waren,
              die durch Zollbehörden beschlagnahmt werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 6 Widerrufsrecht</h2>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="font-semibold text-red-700 mb-2">Kein Widerrufsrecht</p>
              <p className="text-sm text-red-600">
                Gemäß § 312g Abs. 2 Nr. 2 BGB besteht für Waren, die nach Kundenspezifikation
                gefertigt werden oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten
                sind, kein Widerrufsrecht. Da unsere Forschungschemikalien speziell für
                Forschungszwecke hergestellt und abgefüllt werden, ist ein Widerruf
                ausgeschlossen.
              </p>
            </div>
            <p className="mt-3 text-sm">
              Davon unberührt bleiben gesetzliche Gewährleistungsrechte bei mangelhafter Ware.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 7 Gewährleistung</h2>
            <p>
              Es gelten die gesetzlichen Gewährleistungsvorschriften. Die Gewährleistungsfrist
              beträgt 2 Jahre ab Lieferung. Mängel sind unverzüglich nach Entdeckung
              schriftlich anzuzeigen.
            </p>
            <p className="mt-3">
              Qualitätsmängel, die auf unsachgemäße Lagerung, Handhabung oder Verwendung
              außerhalb der angegebenen Forschungszwecke zurückzuführen sind, sind von
              der Gewährleistung ausgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 8 Haftungsbeschränkung</h2>
            <p>
              369 Research haftet nicht für Schäden, die durch unsachgemäße Verwendung
              der Produkte entstehen, insbesondere nicht für Schäden, die durch die
              Verwendung der Produkte entgegen ihrer Bestimmung als Forschungschemikalien
              entstehen.
            </p>
            <p className="mt-3">
              Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit keine
              wesentlichen Vertragspflichten verletzt werden und kein Schaden an Leib,
              Leben oder Gesundheit vorliegt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 9 Datenschutz</h2>
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <a href="/datenschutz" className="text-brand-blue hover:underline">
                Datenschutzerklärung
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 10 Anwendbares Recht und Gerichtsstand</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
              UN-Kaufrechts (CISG). Gerichtsstand für alle Streitigkeiten aus dem
              Vertragsverhältnis ist, soweit gesetzlich zulässig, der Sitz von 369 Research.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">§ 11 Salvatorische Klausel</h2>
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
              bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle
              der unwirksamen Bestimmung tritt eine Regelung, die dem wirtschaftlichen
              Zweck der unwirksamen Bestimmung am nächsten kommt.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Stand: Juni 2025 · 369 Research · peptidpen.de<br />
              <strong>Research Use Only — Not for human use.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
