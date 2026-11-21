import { useState } from "react";
import { addPreviewItem } from "../lib/previewCart";
export default function TravelTubeSection() {
  const [added,setAdded] = useState(false);
  return <section className="travel-tube-section"><div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    <div className="travel-tube-photo"><img src="/assets/travel-tube-reference.png" alt="Weiße 369 Research Travel Tube, 80 mm hoch und 19 mm Durchmesser" loading="lazy" /></div>
    <div><span className="staging-kicker">369 TRAVEL TUBE</span><h2 className="staging-heading">KLEIN VERPACKT.<br /><span>GUT AUFGEHOBEN.</span></h2>
      <p className="section-subtitle mt-6">Die kompakte Ergänzung für deine 369 Plug&amp;Play Patrone. Ein fester Platz zum Aufbewahren und Mitnehmen.</p>
      <div className="flex flex-wrap gap-3 my-6 text-brand-blue"><span>80 mm Höhe</span><span>19 mm Durchmesser</span><span>369 Design</span></div>
      <p className="text-slate-500 mb-5">Bald erhältlich</p>
      <button className="staging-primary-button" onClick={()=>{addPreviewItem("preview-travel-tube","369 Travel Tube");setAdded(true)}}>{added ? "VORGEMERKT" : "ZUR AUSWAHL HINZUFÜGEN"}</button>
      {added && <a className="block text-brand-blue mt-4 underline" href="/checkout">Auswahl ansehen</a>}
    </div>
  </div></section>;
}
