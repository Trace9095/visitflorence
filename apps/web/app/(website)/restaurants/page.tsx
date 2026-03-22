import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ListingCard } from "@/components/listing-card";
import { Utensils } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dining & Restaurants",
  description:
    "Local restaurants and dining in Florence, Colorado — from classic American diners to authentic Mexican cuisine.",
};

export default async function RestaurantsPage() {
  const db = getDb();
  const restaurantListings = await db
    .select()
    .from(listings)
    .where(eq(listings.category, "restaurants"))
    .orderBy(listings.featured, listings.name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Utensils size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Local Dining
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Restaurants &amp; Dining
        </h1>
        <p className="text-lg max-w-2xl leading-7" style={{ color: "#9B8374" }}>
          Fuel your antiquing adventure with Florence&apos;s local dining scene.
          From classic diner breakfasts to authentic green chile, the flavors
          of southern Colorado come alive right here on Main Street.
        </p>
      </div>

      {restaurantListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {restaurantListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              href={`/restaurants`}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-24 rounded-xl border"
          style={{ borderColor: "#3D2518", color: "#9B8374" }}
        >
          <Utensils size={40} style={{ color: "#3D2518", margin: "0 auto 16px" }} />
          <p>Listings coming soon.</p>
        </div>
      )}
    </div>
  );
}
