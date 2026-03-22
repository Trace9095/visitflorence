import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = getDb();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const listingId = session.metadata?.listing_id;
        const plan = session.metadata?.plan as "premium" | "sponsored" | undefined;

        if (listingId && plan) {
          await db
            .update(listings)
            .set({
              tier: plan,
              featured: plan === "premium" || plan === "sponsored",
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
            })
            .where(eq(listings.id, Number(listingId)));
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const status = sub.status;
        // If subscription paused or cancelled, downgrade to free
        if (status === "past_due" || status === "unpaid") {
          await db
            .update(listings)
            .set({ tier: "free", featured: false })
            .where(eq(listings.stripeSubscriptionId, sub.id));
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .update(listings)
          .set({ tier: "free", featured: false, stripeSubscriptionId: null })
          .where(eq(listings.stripeSubscriptionId, sub.id));
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as { subscription?: string }).subscription;
        if (subId) {
          await db
            .update(listings)
            .set({ tier: "free", featured: false })
            .where(eq(listings.stripeSubscriptionId, subId));
        }
        break;
      }
    }
  } catch (err) {
    console.error(JSON.stringify({ level: "error", msg: "stripe webhook handler failed", type: event.type, error: String(err) }));
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
