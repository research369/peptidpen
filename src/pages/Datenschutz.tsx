/**
 * Datenschutzerklärung — peptidpen.de
 * Research Use Only — 369 Research
 */
export default function Datenschutz() {
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
            Datenschutzerklärung
          </h1>
          <p className="text-blue-200/60 mt-2 text-sm">
            Stand: Juni 2025 · peptidpen.de
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">1. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm">
              <strong>369 Research</strong><br />
              Betreiber: Pakko Randale<br />
              Deutschland<br />
              E-Mail: 369peptides@gmail.com<br />
              Website: <a href="https://www.369research.eu" className="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">www.369research.eu</a>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">2. Allgemeines zur Datenverarbeitung</h2>
            <p>
              Diese Website (peptidpen.de) ist eine reine Informations- und Weiterleitungsseite.
              Es werden keine Bestellungen direkt auf dieser Website verarbeitet. Bestellungen
              werden ausschließlich über den Hauptshop unter <a href="https://www.369research.eu" className="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">www.369research.eu</a> abgewickelt.
            </p>
            <p className="mt-3">
              Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur
              Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und
              Leistungen erforderlich ist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">3. Hosting und Server-Logs</h2>
            <p>
              Diese Website wird über <strong>Netlify, Inc.</strong> (2325 3rd Street, Suite 215,
              San Francisco, CA 94107, USA) gehostet. Beim Aufruf unserer Website werden durch
              den Hosting-Anbieter automatisch folgende Daten in Server-Log-Dateien gespeichert:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>IP-Adresse des anfragenden Rechners</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
              <li>Verwendeter Browser und ggf. das Betriebssystem</li>
            </ul>
            <p className="mt-3">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der sicheren und stabilen Bereitstellung der Website).
              Die Daten werden nach 30 Tagen automatisch gelöscht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">4. Cookies und lokaler Speicher</h2>
            <p>
              Diese Website verwendet ausschließlich technisch notwendige Cookies und
              den lokalen Browser-Speicher (localStorage) für folgende Zwecke:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Speicherung der Altersverifikations-Bestätigung (localStorage: <code className="bg-gray-100 px-1 rounded">peptidpen_age_confirmed</code>)</li>
            </ul>
            <p className="mt-3">
              Es werden keine Tracking-Cookies, Marketing-Cookies oder Cookies von
              Drittanbietern gesetzt. Die Verarbeitung erfolgt auf Grundlage von
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">5. Externe Dienste</h2>

            <h3 className="text-base font-semibold text-brand-dark mt-4 mb-2">5.1 WhatsApp</h3>
            <p className="text-sm">
              Auf dieser Website ist ein Link zum WhatsApp-Dienst der Meta Platforms Ireland Ltd.
              eingebunden. Wenn Sie auf den WhatsApp-Button klicken, werden Sie zur WhatsApp-App
              weitergeleitet. Dabei werden Daten an WhatsApp übertragen. Informationen zur
              Datenverarbeitung durch WhatsApp finden Sie in der{" "}
              <a href="https://www.whatsapp.com/legal/privacy-policy" className="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">
                WhatsApp-Datenschutzerklärung
              </a>.
            </p>

            <h3 className="text-base font-semibold text-brand-dark mt-4 mb-2">5.2 API-Verbindung zum Backend</h3>
            <p className="text-sm">
              Zur Anzeige von Produktinformationen und Preisen verbindet sich diese Website
              mit unserem Backend-Server (Railway.app). Dabei werden keine personenbezogenen
              Daten übertragen — es handelt sich ausschließlich um öffentlich zugängliche
              Produktdaten (Preise, Namen, Beschreibungen).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">6. Ihre Rechte</h2>
            <p>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
              personenbezogenen Daten:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-3">
              Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
            </p>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:369peptides@gmail.com" className="text-brand-blue hover:underline">
                369peptides@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-3">7. Aktualität und Änderungen</h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Juni 2025.
              Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund
              geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es
              notwendig werden, diese Datenschutzerklärung zu ändern.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              <strong>Hinweis:</strong> Alle auf peptidpen.de verlinkten Produkte sind
              ausschließlich für Forschungszwecke bestimmt (Research Use Only).
              Nicht zur menschlichen Anwendung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
