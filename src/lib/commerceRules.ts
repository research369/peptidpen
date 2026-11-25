/** Display rules only. The order service must independently validate every quote. */
export const DISCOUNT_TIERS = [
  { quantity: 5, percent: 15 },
  { quantity: 10, percent: 20 },
  { quantity: 20, percent: 25 },
  { quantity: 40, percent: 35 },
] as const;

export function cartridgeDiscountPercent(quantity: number): number {
  if (!Number.isInteger(quantity) || quantity < 0) return 0;
  return [...DISCOUNT_TIERS].reverse().find(tier => quantity >= tier.quantity)?.percent ?? 0;
}
