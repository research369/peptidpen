import type { ReactNode } from "react";
import { addPreviewItem, readPreviewCart } from "../lib/previewCart";
import { getCheckoutUrl } from "../lib/config";

export default function PenSelectionLink({ children, className }: { children: ReactNode; className?: string }) {
  return <a href={getCheckoutUrl()} className={className} onClick={(event) => {
    if (!readPreviewCart().some(item => item.id === "preview-pen") && !addPreviewItem("preview-pen", "369 Pen mit Case und 3 Pen-Nadeln")) event.preventDefault();
  }}>{children}</a>;
}
