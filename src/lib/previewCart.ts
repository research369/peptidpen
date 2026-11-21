export type PreviewCartItem = { id: string; name: string; quantity: number };
export const TRAVEL_TUBE_UNIT_PRICE = 5;
/** Gifts are derived, never stored as paid cart rows. One tube per cartridge. */
export function freeTravelTubeCount(items: PreviewCartItem[]) {
  return items.filter(i => i.id.startsWith("preview-cartridge-")).reduce((sum,i) => sum+i.quantity,0);
}
const KEY = "peptidpen_preview_cart_v1";
const RETIRED_PREVIEW_IDS = new Set(["preview-cartridge-ahk-cu", "preview-cartridge-slu-pp-332", "preview-cartridge-nexus-iv"]);
export function readPreviewCart(): PreviewCartItem[] {
  try { const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.filter(i => typeof i?.id === "string" && !RETIRED_PREVIEW_IDS.has(i.id) && typeof i.name === "string" && Number.isInteger(i.quantity) && i.quantity > 0).map(i => ({ id:i.id, name:i.name, quantity:Math.min(i.quantity,99) })) : [];
  } catch { return []; }
}
export function setPreviewCart(items: PreviewCartItem[]) { localStorage.setItem(KEY, JSON.stringify(items)); }
export function addPreviewItem(id: string, name: string) {
  const items = readPreviewCart(); const existing = items.find(i => i.id === id);
  if (existing) existing.quantity = Math.min(existing.quantity + 1,99);
  else items.push({ id, name, quantity:1 });
  setPreviewCart(items);
}
