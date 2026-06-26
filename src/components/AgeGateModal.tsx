interface AgeGateModalProps {
  onConfirm: () => void;
}

export default function AgeGateModal({ onConfirm }: AgeGateModalProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center">
        <div className="text-5xl mb-4">🔬</div>
        <h2 className="text-2xl font-bold text-brand-dark mb-3">
          Forschungsplattform
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          Diese Website richtet sich ausschließlich an Forscher und wissenschaftlich
          tätige Personen. Alle Produkte sind <strong>Research Use Only</strong> und
          nicht zur menschlichen Anwendung bestimmt.
        </p>
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
            Ich bin mindestens 18 Jahre alt
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
            Ich nutze diese Seite ausschließlich zu Forschungszwecken
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
            Ich verstehe, dass die Produkte nicht zur menschlichen Anwendung bestimmt sind
          </div>
        </div>
        <button
          onClick={onConfirm}
          className="btn-primary w-full text-base py-4"
        >
          Bestätigen &amp; Weiter zur Forschungsplattform
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Mit dem Klick bestätigst du die oben genannten Punkte.
        </p>
      </div>
    </div>
  );
}
