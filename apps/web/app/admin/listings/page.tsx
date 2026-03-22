import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Plus, Star, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Listings — Admin" };

const CATEGORY_LABELS: Record<string, string> = {
  antiques: "Antiques",
  breweries: "Breweries",
  restaurants: "Restaurants",
  activities: "Activities",
  art: "Art",
  lodging: "Lodging",
  services: "Services",
};

const TIER_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  free: { bg: "rgba(107,114,128,0.15)", text: "#9CA3AF", label: "Free" },
  premium: { bg: "rgba(96,165,250,0.15)", text: "#60A5FA", label: "Premium" },
  sponsored: { bg: "rgba(212,168,83,0.15)", text: "#D4A853", label: "Sponsored" },
};

export default async function AdminListingsPage() {
  const db = getDb();
  const allListings = await db.select().from(listings).orderBy(listings.tier, listings.name);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#F0F6FC" }}>
            Listings
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8B949E" }}>
            {allListings.length} total
          </p>
        </div>
        <Link
          href="/add-listing"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold min-h-[44px]"
          style={{ backgroundColor: "#D4A853", color: "#0D1117" }}
        >
          <Plus size={16} />
          Add Listing
        </Link>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "#30363D" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #30363D", backgroundColor: "#161B22" }}>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide" style={{ color: "#8B949E" }}>
                Business
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide hidden md:table-cell" style={{ color: "#8B949E" }}>
                Category
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide" style={{ color: "#8B949E" }}>
                Tier
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide hidden lg:table-cell" style={{ color: "#8B949E" }}>
                Claimed By
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide" style={{ color: "#8B949E" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allListings.map((listing) => {
              const tier = TIER_STYLES[listing.tier] ?? TIER_STYLES.free;
              return (
                <tr
                  key={listing.id}
                  style={{ borderBottom: "1px solid #21262D" }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {listing.featured && (
                        <Star size={12} style={{ color: "#D4A853" }} />
                      )}
                      <span style={{ color: "#F0F6FC" }}>{listing.name}</span>
                    </div>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "#8B949E" }}>
                      /{listing.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell" style={{ color: "#8B949E" }}>
                    {CATEGORY_LABELS[listing.category] ?? listing.category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: tier.bg, color: tier.text }}
                    >
                      {tier.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {listing.claimedByEmail ? (
                      <span className="text-xs font-mono" style={{ color: "#34D399" }}>
                        {listing.claimedByEmail}
                      </span>
                    ) : (
                      <span className="text-xs font-mono" style={{ color: "#8B949E" }}>
                        Unclaimed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/${listing.category}/${listing.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs min-h-[44px] px-1"
                      style={{ color: "#D4A853" }}
                    >
                      <ExternalLink size={12} />
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
