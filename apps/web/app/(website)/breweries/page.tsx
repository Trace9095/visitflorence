import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ListingCard } from "@/components/listing-card";
import { Beer } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breweries & Bars",
  description:
    "Discover local craft breweries and bars in Florence, Colorado, including Florence Brewing Company.",
};

export default async function BreweriesPage() {
  const db = getDb();
  const breweryListings = await db
    .select()
    .from(listings)
    .where(eq(listings.category, "breweries"))
    .orderBy(listings.featured, listings.name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Beer size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Craft Beer
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Breweries &amp; Bars
        </h1>
        <p className="text-lg max-w-2xl leading-7" style={{ color: "#9B8374" }}>
          Florence&apos;s craft beer scene is anchored by Florence Brewing Company,
          a neighborhood taproom that keeps the Colorado spirit alive with
          handcrafted ales and lagers. Just a short drive brings you to even
          more options in the Canon City area.
        </p>
      </div>

      {breweryListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {breweryListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              href={`/breweries`}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-24 rounded-xl border"
          style={{ borderColor: "#3D2518", color: "#9B8374" }}
        >
          <Beer size={40} style={{ color: "#3D2518", margin: "0 auto 16px" }} />
          <p>Listings coming soon.</p>
        </div>
      )}

      {/* Florence Brewing feature */}
      <section
        className="mt-16 rounded-2xl border p-8 md:p-12"
        style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
      >
        <div className="max-w-2xl">
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Florence Original
          </span>
          <h2
            className="text-2xl font-bold tracking-tight mt-3 mb-4"
            style={{ color: "#F5EDD6" }}
          >
            Florence Brewing Company
          </h2>
          <p className="leading-7 mb-6" style={{ color: "#9B8374" }}>
            Housed in a beautifully restored historic building, Florence Brewing
            Company is the heart of the local craft beer scene. Expect
            handcrafted ales, rotating seasonal taps, and a relaxed taproom
            atmosphere that feels distinctly Colorado. Live music on weekends.
          </p>
          <div className="space-y-2 text-sm font-mono" style={{ color: "#9B8374" }}>
            <div>100 E 3rd St, Florence, CO 81226</div>
            <div>(719) 784-2337</div>
            <div>Wed-Thu 4-9pm &middot; Fri-Sat 12-10pm &middot; Sun 12-7pm</div>
          </div>
        </div>
      </section>
    </div>
  );
}
