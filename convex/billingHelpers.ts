import { Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx } from "./_generated/server";

type BillingCtx = QueryCtx | MutationCtx;

/**
 * No-op billing gates for self-hosted deployment.
 * Stripe billing has been removed — all teams have unlimited access.
 */

export async function assertTeamHasActiveSubscription(
  _ctx: BillingCtx,
  _teamId: Id<"teams">,
) {
  // No-op: self-hosted, no billing
  return { hasActiveSubscription: true };
}

export async function assertTeamCanStoreBytes(
  _ctx: BillingCtx,
  _teamId: Id<"teams">,
  _incomingBytes: number,
) {
  // No-op: self-hosted, no storage limits
  return { hasActiveSubscription: true };
}
