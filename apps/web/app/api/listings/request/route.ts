import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { claimRequests, listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, name, email, phone, message, listingId } = body;

    if (!businessName || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getDb();

    // If tied to an existing listing, save a claim request
    if (listingId) {
      await db.insert(claimRequests).values({
        listingId: Number(listingId),
        email,
        name,
        phone: phone || null,
        message: message || null,
        status: "pending",
      });
    }

    // Send admin notification (non-blocking)
    if (process.env.RESEND_API_KEY) {
      const { sendRequestListingNotification } = await import("@/lib/email");
      sendRequestListingNotification({
        businessName,
        submitterName: name,
        submitterEmail: email,
        phone: phone || undefined,
        message: message || undefined,
      }).catch((err: unknown) =>
        console.error(JSON.stringify({ level: "error", msg: "request email failed", error: String(err) }))
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(JSON.stringify({ level: "error", msg: "listing request failed", error: String(err) }));
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
