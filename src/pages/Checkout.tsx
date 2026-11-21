import { useState } from "react";
import { readPreviewCart, setPreviewCart, addPreviewItem, freeTravelTubeCount, TRAVEL_TUBE_UNIT_PRICE } from "../lib/previewCart";
import "../checkout.css";

export default function Checkout() {
  const [items,setItems] = useState(readPreviewCart);
  const freeTubes = freeTravelTubeCount(items);
  const [delivery,setDelivery] = useState("home");
  const [company,setCompany] = useState(false);
  const [payment,setPayment] = useState("bunq");
  const updateQuantity = (id:string, quantity:number) => {
    const next = items.map(i=>i.id===id?{...i,quantity:Math.min(99,Math.max(0,Math.floor(quantity)||0))}:i).filter(i=>i.quantity>0);
    setItems(next);setPreviewCart(next);
  };
  const add = (id:string,name:string) => { addPreviewItem(id,name);setItems(readPreviewCart()); };
  const field = (label:string,type="text",autoComplete?:string) => <label className="checkout-v2-field"><span>{label}</span><input type={type} autoComplete={autoComplete} /></label>;
  return <main className="checkout-v2-shell">
    <div className="checkout-v2-wrap"><a href="/#produkte" className="checkout-v2-back">Zurück zur Auswahl</a>
      <header className="checkout-v2-header"><div><p>369 Research · Checkout</p><h1>Präzise. Ruhig.<br /><span>Schritt für Schritt.</span></h1></div>
        <div className="checkout-v2-steps"><span className="active"><i>1</i>Auswahl</span><span><i>2</i>Lieferung</span><span><i>3</i>Abschluss</span></div>
      </header>
      <div className="checkout-v2-info mb-6" role="status"><p><strong>Checkout-Vorschau – noch nicht bestellbar.</strong> Die neuen Artikel und Preise werden vorbereitet. Es werden keine Bestellungen angelegt, keine Zahlungen ausgelöst und keine Formulardaten übertragen.</p></div>
      <div className="checkout-v2-grid"><div className="checkout-v2-main">
        <section className="checkout-v2-card"><div className="checkout-v2-section-title"><div><h2>Deine Kontaktdaten</h2></div></div>
          <div className="checkout-v2-fields">{field("Vorname","text","given-name")}{field("Nachname","text","family-name")}{field("E-Mail","email","email")}{field("Telefon","tel","tel")}</div>
          <label className="block mt-5 text-sm"><input type="checkbox" checked={company} onChange={e=>setCompany(e.target.checked)} /> Firma / Institution</label>
          {company && <div className="checkout-v2-fields mt-4">{field("Firma / Institution","text","organization")}{field("Umsatzsteuer-ID (optional)")}</div>}
        </section>
        <section className="checkout-v2-card"><div className="checkout-v2-section-title"><div><h2>Lieferung</h2></div></div>
          <div className="checkout-v2-delivery-options">{[["home","Privatadresse","Direkt zu dir"],["packstation","DHL Packstation","Abholung an deiner Station"],["postfiliale","DHL Postfiliale","Abholung in deiner Filiale"]].map(([id,title,sub])=><button type="button" key={id} className={delivery===id?"selected":""} aria-pressed={delivery===id} onClick={()=>setDelivery(id)}><strong>{title}</strong><small>{sub}</small></button>)}</div>
          <div className="checkout-v2-fields">
            {delivery==="home"?<>{field("Straße","text","address-line1")}{field("Hausnummer")}</>:<>{field(delivery==="packstation"?"Packstation-Nummer":"Postfiliale-Nummer")}{field("DHL Postnummer")}</>}
            {field("Postleitzahl","text","postal-code")}{field("Ort","text","address-level2")}
            <label className="checkout-v2-field"><span>Land</span><select defaultValue="DE" autoComplete="country"><option value="DE">Deutschland</option><option value="AT">Österreich</option><option value="PL">Polen</option><option value="CH">Schweiz</option><option value="FR">Frankreich</option><option value="NL">Niederlande</option></select></label>
          </div>
        </section>
        <section className="checkout-v2-card"><div className="checkout-v2-section-title"><div><h2>Zahlung</h2></div></div>
          <label className="checkout-v2-payment-preview block"><input type="radio" name="payment" checked={payment==="bunq"} onChange={()=>setPayment("bunq")} /> <strong>Banküberweisung</strong><p>Die Zahlungsdaten und der Verwendungszweck werden erst mit einer bestätigten Bestellung bereitgestellt.</p></label>
        </section>
        <section className="checkout-v2-card checkout-v2-research-card"><div className="checkout-v2-section-title"><div><h2>Prüfen &amp; abschließen</h2></div></div>
          <div className="checkout-preview-confirmations">{["Ich bin mindestens 18 Jahre alt.","Ich bestelle ausschließlich zu Forschungszwecken.","Ich habe meine Lieferadresse geprüft."].map(text=><label key={text}><input type="checkbox" /> <span>{text}</span></label>)}</div>
          <p className="text-sm mt-5 text-slate-500">Die <a className="underline" href="/agb">AGB</a>, <a className="underline" href="/datenschutz">Datenschutzhinweise</a> und das <a className="underline" href="/impressum">Impressum</a> findest du hier.</p>
          <button type="button" disabled className="checkout-v2-cta w-full mt-6">Bestellstart folgt</button>
        </section>
      </div>
      <aside className="checkout-v2-summary"><div className="checkout-v2-summary-head"><span>Deine Auswahl</span><em>{items.reduce((n,i)=>n+i.quantity,0)} Stück</em></div>
        <div className="checkout-v2-lines">{items.length===0?<p>Noch keine Produkte vorgemerkt. <a href="/#produkte" className="underline">Auswahl entdecken</a></p>:items.map(item=><div key={item.id}><div><strong>{item.name}</strong><small>{item.id==="preview-travel-tube" ? `${TRAVEL_TUBE_UNIT_PRICE} € pro Stück · ${item.quantity*TRAVEL_TUBE_UNIT_PRICE} €` : "Preis folgt"}</small><label className="block mt-2 text-sm">Menge <input className="w-16 border rounded p-1" type="number" min="0" max="99" value={item.quantity} onChange={e=>updateQuantity(item.id,Number(e.target.value))} /></label></div><button type="button" aria-label={`${item.name} entfernen`} onClick={()=>updateQuantity(item.id,0)}>Entfernen</button></div>)}</div>
        {freeTubes>0 && <div className="checkout-v2-info mb-5"><p><strong>{freeTubes} × 369 Travel Tube · kostenlos</strong><br />Eine pro 369 Plug&amp;Play Patrone. Schützt deine Patrone beim Versand.</p></div>}
        {!items.some(i=>i.id==="preview-pen")&&<button className="staging-outline-button w-full mb-3" onClick={()=>add("preview-pen","369 Pen mit Case und 3 Pen-Nadeln")}>369 Pen ergänzen</button>}
        {!items.some(i=>i.id==="preview-travel-tube")&&<button className="staging-outline-button w-full mb-3" onClick={()=>add("preview-travel-tube","369 Travel Tube")}>Zusätzliche Travel Tube · 5 €</button>}
        <div className="checkout-v2-totals"><p><span>Produktpreise</span><span>folgen</span></p><p><span>Versand</span><span>folgt</span></p><p className="total"><span>Gesamt</span><b>–</b></p></div>
        <div className="checkout-v2-summary-trust"><p>Die Vorschau speichert nur deine Produktauswahl auf diesem Gerät. Kontakt- und Adressdaten werden hier nicht gespeichert oder gesendet.</p></div>
      </aside></div>
    </div>
  </main>;
}
