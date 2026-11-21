import { useState } from "react";
import { addPreviewItem, TRAVEL_TUBE_UNIT_PRICE } from "../lib/previewCart";
export default function TravelTubeSection() {
  const [added,setAdded] = useState(false);
  return <section className="travel-tube-section"><div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    <div className="travel-tube-photo"><img src="/assets/travel-tube-cutout.png" alt="Weiße 369 Research Travel Tube mit blauem Original-Logo" loading="lazy" /></div>
    <div><span className="staging-kicker">ZU JEDER PATRONE KOSTENLOS</span><h2 className="staging-heading">DEINE PATRONE.<br /><span>SICHER VERPACKT.</span></h2>
      <p className="section-subtitle mt-6">Jede 369 Plug&amp;Play Patrone kommt mit einer kostenlosen 369 Travel Tube. Sie schützt die Patrone beim Versand vor Beschädigungen – und bleibt danach zum Aufbewahren und Mitnehmen.</p>
      <div className="my-6 text-brand-blue font-semibold">Eine Patrone. Eine Travel Tube. Gratis dabei.</div>
      <p className="text-slate-500 mb-5">Zusätzliche Travel Tube: {TRAVEL_TUBE_UNIT_PRICE} € pro Stück</p>
      <button className="staging-primary-button" onClick={()=>{addPreviewItem("preview-travel-tube","369 Travel Tube");setAdded(true)}}>{added ? "VORGEMERKT" : "ZUSÄTZLICHE TUBE VORMERKEN · 5 €"}</button>
      {added && <a className="block text-brand-blue mt-4 underline" href="/checkout">Auswahl ansehen</a>}
    </div>
  </div></section>;
}
