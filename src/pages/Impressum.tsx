export default function Impressum() {
  return <main className="min-h-screen bg-[#f4f7fb] py-16 px-5 text-brand-dark">
    <div className="max-w-3xl mx-auto"><a href="/" className="text-brand-blue">Zur Startseite</a>
      <h1 className="text-4xl font-bold my-8">Impressum</h1>
      <div className="bg-white border border-blue-100 rounded-2xl p-8 space-y-7 leading-relaxed">
        <section><h2 className="text-xl font-bold mb-3">369 Research Sp. z o.o.</h2>
          <p>369 RESEARCH Spółka z ograniczoną odpowiedzialnością<br />ul. Hoża 86/210<br />00-682 Warszawa<br />Polen</p></section>
        <section><h2 className="font-bold mb-2">Vertretung</h2><p>Benyamin Rabah (Prezes Zarządu)<br />Dorothee Katharina Rabah (Członek Zarządu)</p></section>
        <section><h2 className="font-bold mb-2">Kontakt</h2><p>ben@369research.eu</p></section>
        <section><h2 className="font-bold mb-2">Registerangaben</h2><p>KRS: 0001234612<br />NIP: 5214161163<br />REGON: 544494943</p>
          <p className="mt-3">Sąd Rejonowy dla m.st. Warszawy w Warszawie,<br />XIII Wydział Gospodarczy Krajowego Rejestru Sądowego</p>
          <p className="mt-3">Stammkapital: 5.000,00 PLN</p></section>
        <section><h2 className="font-bold mb-2">Marken</h2><p>369 Plug&amp;Play und Peptidpen sind zwei Marken der 369 Research Sp. z o.o.</p></section>
      </div>
    </div>
  </main>;
}
