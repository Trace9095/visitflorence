import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, address, phone, website, hours, description, email, plan } = body;

    if (!name || !category || !address || !description || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getDb();

    // Generate unique slug
    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await db.query.listings.findFirst({
        where: (l, { eq }) => eq(l.slug, slug),
      });
      if (!existing) break;
      slug = `${baseSlug}-${counter++}`;
    }

    const [listing] = await db
      .insert(listings)
      .values({
        name,
        slug,
        category,
        address,
        phone: phone || null,
        website: website || null,
        hours: hours || null,
        description,
        shortDescription: description.slice(0, 280),
        tier: "free",
        featured: false,
        claimedByEmail: email,
      })
      .returning();

    // For paid plans, create Stripe Checkout Session
    if ((plan === "premium" || plan === "sponsored") && process.env.STRIPE_SECRET_KEY) {
      const { getStripe } = await import("@/lib/stripe");
      const stripe = getStripe();

      const priceId =
        plan === "premium"
          ? process.env.STRIPE_PRICE_PREMIUM
          : process.env.STRIPE_PRICE_SPONSORED;

      if (!priceId) {
        return NextResponse.json({ ok: true, listingId: listing.id, warning: "Stripe price not configured" });
      }

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://visitflorence.co";

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        customer_email: email,
        metadata: {
          listing_id: String(listing.id),
          plan,
        },
        success_url: `${siteUrl}/${category}/${slug}?claimed=1`,
        cancel_url: `${siteUrl}/pricing`,
      });

      return NextResponse.json({ checkoutUrl: session.url });
    }

    // Send confirmation emails (non-blocking)
    if (process.env.RESEND_API_KEY) {
      const { sendListingConfirmation } = await import("@/lib/email");
      sendListingConfirmation({
        ownerEmail: email,
        businessName: name,
        category,
        slug,
        plan: plan || "free",
      }).catch((err: unknown) =>
        console.error(JSON.stringify({ level: "error", msg: "email send failed", error: String(err) }))
      );
    }

    return NextResponse.json({ ok: true, listingId: listing.id });
  } catch (err) {
    console.error(JSON.stringify({ level: "error", msg: "listing submit failed", error: String(err) }));
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
