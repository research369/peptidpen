import { config } from "../lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold mb-3">Peptidpen.de</div>
            <p className="text-blue-200/60 text-sm leading-relaxed mb-4">
              Der erste wiederverwendbare Peptid-Pen Europas.
              Fertig gemischte Patronen für maximale Forschungseffizienz.
            </p>
            <div className="text-xs text-blue-200/40">
              Ein Angebot von 369 Research
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-200/60">
              Schnellzugriff
            </div>
            <ul className="space-y-2 text-sm text-blue-200/70">
              <li><a href="#produkte" className="hover:text-white transition-colors">Alle Patronen</a></li>
              <li>
                <a
                  href={config.shopBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  369 Research Shop →
                </a>
              </li>
              <li>
                <a
                  href={`${config.shopBaseUrl}/plug-and-play`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Plug&amp;Play Erklärung →
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-semibold mb-3 text-sm uppercase tracking-wide text-blue-200/60">
              Rechtliches
            </div>
            <ul className="space-y-2 text-sm text-blue-200/70">
              <li>
                <a
                  href={`${config.shopBaseUrl}/impressum`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href={`${config.shopBaseUrl}/datenschutz`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href={`${config.shopBaseUrl}/agb`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  AGB
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-blue-200/40 leading-relaxed mb-4 max-w-3xl">
            <strong className="text-blue-200/60">Disclaimer:</strong> Alle auf dieser Website
            angebotenen Produkte sind ausschließlich für Forschungszwecke bestimmt (Research Use Only).
            Sie sind nicht zur Diagnose, Behandlung, Heilung oder Vorbeugung von Krankheiten
            beim Menschen bestimmt. Der Kauf und Besitz kann in einigen Ländern
            Einschränkungen unterliegen. Der Käufer ist für die Einhaltung aller geltenden
            Gesetze und Vorschriften verantwortlich.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-blue-200/30">
            <span>© {currentYear} 369 Research · peptidpen.de</span>
            <span>Research Use Only · Not for human use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
