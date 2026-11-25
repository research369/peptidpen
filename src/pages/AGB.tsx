export default function AGB() {
  return <main className="min-h-screen bg-gray-50">
    <header className="bg-brand-dark py-16 text-white"><div className="container mx-auto px-4 max-w-4xl">
      <a href="/" className="text-blue-200 underline">Zurück zur Startseite</a>
      <h1 className="text-3xl md:text-4xl font-bold mt-6">Bestell- und Vertragshinweise</h1>
    </div></header>
    <div className="container mx-auto px-4 max-w-4xl py-12"><div className="bg-white border rounded-2xl p-8 space-y-6 leading-relaxed">
      <section><h2 className="text-xl font-bold mb-3">Aktuell eine Vorschau</h2>
        <p>Der Checkout auf peptidpen.de ist noch nicht für Bestellungen freigeschaltet. Eine vorgemerkte Auswahl ist keine Bestellung und führt nicht zu einem Vertragsschluss oder einer Zahlung.</p></section>
      <section><h2 className="text-xl font-bold mb-3">Anbieter</h2>
        <p>369 Research Sp. z o.o., ul. Hoża 86/210, 00-682 Warszawa, Polen. Weitere Anbieter- und Kontaktangaben stehen im <a className="text-brand-blue underline" href="/impressum">Impressum</a>.</p></section>
      <section><h2 className="text-xl font-bold mb-3">Vor dem Bestellstart</h2>
        <p>Die vollständigen Geschäftsbedingungen sowie Informationen zu Zahlung, Lieferung, Widerruf und Rückgabe werden vor der Freischaltung des eigenen Checkouts bereitgestellt. Gesetzliche Rechte werden durch den Forschungszweck nicht pauschal ausgeschlossen.</p></section>
      <section><h2 className="text-xl font-bold mb-3">Forschungszwecke</h2>
        <p>Die Produkte sind ausschließlich für wissenschaftliche Forschungszwecke bestimmt und nicht für die Anwendung an Menschen oder Tieren vorgesehen.</p></section>
      <p className="text-sm text-slate-500">Vorschauzustand: 25. November 2026.</p>
    </div></div>
  </main>;
}
