# Peptidpen release gates — 25 November 2026

Production stays unchanged. PR #2 remains draft until preview review and commercial readiness.

## Implemented in this change

- One browser-local selection for pens, cartridges and paid additional tubes.
- Mobile selection link with live count; interactive pen image views.
- Cart allowlist, canonical product names, duplicate merging and quantity validation.
- Approved discount boundaries from one shared rule; gift tubes derived separately.
- No fabricated cartridge prices, article identifiers, stock or order totals.
- Shared pen read request; no vial catalog request or fabricated fallback stock.
- Self-hosted fonts; no optional analytics or misleading consent banner.
- Static HTML content and page-specific metadata for home and legal routes.
- Preview noindex output and checkout noindex; consistent sitemap hostname.
- Visible FAQ and structured FAQ use the same source.
- Automated commerce tests and ESLint checked before preview deployment.
- Old blanket withdrawal exclusion replaced with a non-sale preview notice.

## Gates, not implementation claims

1. Complete `catalog-readiness.csv` with real cartridge article IDs/SKUs/shopProductIds,
   sale prices, stock, strengths and approved specifications. It is a preparation
   table, not an import file and never changes WaWi by itself.
2. Confirm Cartendon 20/48 units/composition. Confirm the remaining inherited
   cartridge assortment and strengths; do not use vial variants as substitutes.
3. Verify backend support for a separate Peptidpen sales channel and Polish seller:
   approved cartridge discounts, no cold shipping, one free tube per cartridge,
   paid extra tubes, server tax/shipping/stock rules and public catalog visibility.
   Do not mutate global mainshop campaigns/settings to implement these rules.
4. Integrate only against the verified server contract. Mainshop source read on
   2026-11-25 confirms `order.create`, `order.checkoutStatus` and
   `shopSettings.getBankTransferPresentation` exist. It does not prove that a
   Peptidpen-specific server quote/profile or gift rule exists. Do not infer it.
5. Use server-generated payment instructions, order ID and totals; never put
   account credentials or database URLs into client code. No order mutations
   have been called during this implementation.
6. Require an approved server quote, delivery/contact validation, required
   confirmations and durable idempotency before enabling checkout. Handle unknown
   responses via status lookup, not automatic new order submission.
7. Review Polish seller legal terms, withdrawal information, privacy processors,
   actual log retention, tax/shipping display, product claims and official company
   register. Preview notice is not final commercial AGB.
8. Choose the existing approved analytics destination/consent setup. Current code
   forwards allowlisted campaign query parameters but sends no analytics events.
   Bind purchase conversion only to a confirmed server receipt. No PII in events.
9. Test in a separate test environment: price tampering, duplicates, stock shortage,
   gift stock, taxes/shipping destinations, payment matching, confirmation email,
   cancellation/restock and cross-channel isolation. Never create test orders in
   the live mainshop without explicit authorization.
10. Final desktop/mobile/accessibility review, PR approval, merge, production check.

The owner-supplied Europe-first headline remains in the preview; substantiate
the market claim or approve neutral wording before production release.
