export type PreviewCartItem = { id: string; name: string; quantity: number };
const KEY = "peptidpen_preview_cart_v1";
export function readPreviewCart(): PreviewCartItem[] {
  try { const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.filter(i => typeof i.id === "string" && typeof i.name === "string" && Number.isInteger(i.quantity) && i.quantity > 0).map(i => ({ id:i.id, name:i.name, quantity:Math.min(i.quantity,99) })) : [];
  } catch { return []; }
}
export function setPreviewCart(items: PreviewCartItem[]) { localStorage.setItem(KEY, JSON.stringify(items)); }
export function addPreviewItem(id: string, name: string) {
  const items = readPreviewCart(); const existing = items.find(i => i.id === id);
  if (existing) existing.quantity = Math.min(existing.quantity + 1,99);
  else items.push({ id, name, quantity:1 });
  setPreviewCart(items);
}
