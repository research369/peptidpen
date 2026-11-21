import type { Handler } from "@netlify/functions";

/** No cartridge feed until distinct WaWi articles and verified prices exist. */
export const handler: Handler = async () => ({
  statusCode: 503,
  headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  body: "Product feed unavailable until cartridge catalog approval.",
});
