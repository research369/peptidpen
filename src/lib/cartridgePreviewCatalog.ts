import { FALLBACK_PRODUCTS } from "./fallbackProducts";

export interface CartridgePreviewProduct {
  id: string;
  name: string;
  categories: string[];
  composition?: string;
}

// Explicit editorial overrides; never delete/change the corresponding WaWi articles.
const excludedPreviewIds = new Set(["ahk-cu", "slu-pp-332", "nexus-iv"]);

/** Design preview only. No Vial SKU, price, stock, strength or shop route is reused. */
const existingCatalog: CartridgePreviewProduct[] = FALLBACK_PRODUCTS
  .filter(({ id, name }) => !excludedPreviewIds.has(id) && !/^SLU\b/i.test(name) && !/^AHK[-\s]?Cu/i.test(name) && !/^Nexus IV$/i.test(name))
  .map(({ id, name, categories }) => ({
  id: `preview-cartridge-${id}`,
  name,
  categories,
}));

// Names, amounts and blend compositions supplied by the owner; not dosage advice.
const newCatalog: CartridgePreviewProduct[] = [
  { id: "preview-cartridge-eloralintide-5mg", name: "Eloralintide 5 mg", categories: ["Metabolisch & Körperkomposition"] },
  { id: "preview-cartridge-eloralintide-10mg", name: "Eloralintide 10 mg", categories: ["Metabolisch & Körperkomposition"] },
  { id: "preview-cartridge-nexus-iv-25mg", name: "Nexus IV 4:1 · 25 mg", categories: ["Blends"], composition: "20 mg 3G + 5 mg Cagri" },
  { id: "preview-cartridge-nexus-v-12-5mg", name: "Nexus V 4:1 · 12,5 mg", categories: ["Blends"], composition: "10 mg 3G + 2,5 mg Eloralintide" },
  { id: "preview-cartridge-nexus-v-25mg", name: "Nexus V 4:1 · 25 mg", categories: ["Blends"], composition: "20 mg 3G + 5 mg Eloralintide" },
  { id: "preview-cartridge-mitobolic-120", name: "Mitobolic 120", categories: ["Blends"], composition: "NAD+ 100 mg + MOTS-C 10 mg + 5-Amino-1-MQ 10 mg" },
  { id: "preview-cartridge-cartendon-20", name: "Cartendon 20", categories: ["Blends"] },
  { id: "preview-cartridge-cartendon-48", name: "Cartendon 48", categories: ["Blends"] },
];

export const cartridgePreviewCatalog = [...existingCatalog, ...newCatalog]
  .sort((a, b) => a.name.localeCompare(b.name, "de"));
