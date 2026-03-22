import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ListingCard } from "@/components/listing-card";
import { Store } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antique Shops",
  description:
    "Browse 100+ antique shops on historic Main Street in Florence, Colorado — the Antique Capital of Colorado.",
};

export default async function AntiquesPage() {
  const db = getDb();
  const antiqueListings = await db
    .select()
    .from(listings)
    .where(eq(listings.category, "antiques"))
    .orderBy(listings.featured, listings.name);

  const featured = antiqueListings.filter((l) => l.featured);
  const rest = antiqueListings.filter((l) => !l.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Store size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            100+ Shops
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Antique Shops
        </h1>
        <p className="text-lg max-w-2xl leading-7" style={{ color: "#9B8374" }}>
          Florence is the Antique Capital of Colorado for a reason. Over 100
          antique shops line historic Main Street and the surrounding blocks,
          offering everything from Victorian furniture to Western Americana,
          oil-era memorabilia, vintage jewelry, and mid-century collectibles.
        </p>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-14">
          <h2
            className="text-lg font-semibold mb-6 flex items-center gap-2"
            style={{ color: "#F5EDD6" }}
          >
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                backgroundColor: "rgba(193,154,107,0.15)",
                color: "#C19A6B",
              }}
            >
              FEATURED
            </span>
            Top Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                href={`/antiques/${listing.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* All shops */}
      {rest.length > 0 && (
        <section>
          <h2
            className="text-lg font-semibold mb-6"
            style={{ color: "#F5EDD6" }}
          >
            All Antique Shops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                href={`/antiques/${listing.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {antiqueListings.length === 0 && (
        <div
          className="text-center py-24 rounded-xl border"
          style={{ borderColor: "#3D2518", color: "#9B8374" }}
        >
          <Store size={40} style={{ color: "#3D2518", margin: "0 auto 16px" }} />
          <p>Listings coming soon.</p>
        </div>
      )}
    </div>
  );
}
