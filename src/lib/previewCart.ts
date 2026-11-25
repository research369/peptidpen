import { cartridgePreviewCatalog } from "./cartridgePreviewCatalog";
export type PreviewCartItem = { id: string; name: string; quantity: number };
export const TRAVEL_TUBE_UNIT_PRICE = 5;
/** Gifts are derived, never stored as paid cart rows. One tube per cartridge. */
export function freeTravelTubeCount(items: PreviewCartItem[]) {
  return items.filter(i => i.id.startsWith("preview-cartridge-")).reduce((sum,i) => sum+i.quantity,0);
}
const KEY = "peptidpen_preview_cart_v1";
const catalog = new Map([
  ...cartridgePreviewCatalog.map(item => [item.id, item.name] as const),
  ["preview-pen", "369 Pen mit Case und 3 Pen-Nadeln"],
  ["preview-travel-tube", "369 Travel Tube"],
]);
export function normalizePreviewCart(raw: unknown): PreviewCartItem[] {
  if (!Array.isArray(raw)) return [];
  const quantities = new Map<string, number>();
  for (const item of raw) {
    if (!item || !catalog.has(item.id) || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) continue;
    quantities.set(item.id, Math.min(99, (quantities.get(item.id) ?? 0) + item.quantity));
  }
  return [...quantities].map(([id, quantity]) => ({ id, name: catalog.get(id)!, quantity }));
}
export function readPreviewCart(): PreviewCartItem[] {
  try { const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return normalizePreviewCart(raw);
  } catch { return []; }
}
export function setPreviewCart(items: PreviewCartItem[]): boolean {
  try { localStorage.setItem(KEY, JSON.stringify(normalizePreviewCart(items))); }
  catch { window.dispatchEvent(new Event("peptidpen-cart-storage-error")); return false; }
  window.dispatchEvent(new Event("peptidpen-cart-updated"));
  return true;
}
export function addPreviewItem(id: string, name: string) {
  const items = readPreviewCart(); const existing = items.find(i => i.id === id);
  if (existing) existing.quantity = Math.min(existing.quantity + 1,99);
  else items.push({ id, name, quantity:1 });
  return setPreviewCart(items);
}
