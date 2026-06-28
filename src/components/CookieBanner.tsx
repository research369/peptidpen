/**
 * CookieBanner.tsx — DSGVO-konformes Cookie-Banner für peptidpen.de
 */
import { useState, useEffect } from "react";

const COOKIE_KEY = "peptidpen_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Kurze Verzögerung damit Age-Gate zuerst erscheint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      role="dialog"
      aria-label="Cookie-Einstellungen"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Icon + Text */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🍪</span>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                Diese Website verwendet Cookies
              </h3>
            </div>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              Wir verwenden technisch notwendige Cookies für den Betrieb dieser Website sowie optionale Analyse-Cookies zur Verbesserung unseres Angebots. Weitere Informationen findest du in unserer{" "}
              <a
                href="/datenschutz"
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/datenschutz");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
              >
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:flex-shrink-0">
            <button
              onClick={reject}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Nur notwendige
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 rounded-xl bg-brand-blue text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
