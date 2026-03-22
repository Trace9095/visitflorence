import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ListingCard } from "@/components/listing-card";
import { Mountain, Navigation, Fish, Footprints } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities & Adventures",
  description:
    "Outdoor activities near Florence, Colorado — Royal Gorge, Gold Belt Tour, Arkansas River rafting and fly fishing, fossil sites, and more.",
};

const highlights = [
  {
    icon: Mountain,
    label: "Royal Gorge",
    sub: "956-foot suspension bridge · 15 min away",
  },
  {
    icon: Navigation,
    label: "Gold Belt Tour",
    sub: "100-mile National Scenic Byway",
  },
  {
    icon: Fish,
    label: "Arkansas River",
    sub: "Gold Medal fly fishing + Class III-V rafting",
  },
  {
    icon: Footprints,
    label: "Fossil Beds",
    sub: "Dinosaur quarries near Canon City",
  },
];

export default async function ActivitiesPage() {
  const db = getDb();
  const activityListings = await db
    .select()
    .from(listings)
    .where(eq(listings.category, "activities"))
    .orderBy(listings.featured, listings.name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Mountain size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Adventure Awaits
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Activities &amp; Adventures
        </h1>
        <p className="text-lg max-w-2xl leading-7" style={{ color: "#9B8374" }}>
          Florence sits at the heart of one of Colorado&apos;s most spectacular outdoor
          adventure zones. The Royal Gorge, Arkansas River, Gold Belt Tour, and
          fossil beds are all within a short drive of Main Street.
        </p>
      </div>

      {/* Quick highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {highlights.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="p-4 rounded-xl border"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
          >
            <Icon size={22} style={{ color: "#C19A6B", marginBottom: 10 }} />
            <div className="font-semibold text-sm" style={{ color: "#F5EDD6" }}>
              {label}
            </div>
            <div className="text-xs mt-1" style={{ color: "#9B8374" }}>
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* Activity listings */}
      {activityListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {activityListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              href={`/activities`}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-24 rounded-xl border"
          style={{ borderColor: "#3D2518", color: "#9B8374" }}
        >
          <Mountain size={40} style={{ color: "#3D2518", margin: "0 auto 16px" }} />
          <p>Listings coming soon.</p>
        </div>
      )}
    </div>
  );
}
