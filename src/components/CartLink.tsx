import { useEffect, useState } from "react";
import { readPreviewCart } from "../lib/previewCart";
import { getCheckoutUrl } from "../lib/config";

export default function CartLink() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(readPreviewCart().reduce((sum, item) => sum + item.quantity, 0));
    update();
    window.addEventListener("storage", update);
    window.addEventListener("peptidpen-cart-updated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("peptidpen-cart-updated", update);
    };
  }, []);
  return <a href={getCheckoutUrl()} className="staging-outline-button" aria-label={`Deine Auswahl, ${count} Artikel`}>
    AUSWAHL <span aria-hidden="true">({count})</span>
  </a>;
}
