import { FALLBACK_PRODUCTS } from "./fallbackProducts";

/** Design preview only. No Vial SKU, price, stock, strength or shop route is reused. */
export const cartridgePreviewCatalog = FALLBACK_PRODUCTS.map(({ id, name, categories }) => ({
  id: `preview-cartridge-${id}`,
  name,
  categories,
}));

export type CartridgePreviewProduct = (typeof cartridgePreviewCatalog)[number];
