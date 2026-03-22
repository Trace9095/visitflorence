import { getDb } from "@/lib/db";
import { listings, events, admins } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";
import { LayoutDashboard, List, CalendarDays, Users, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard — VisitFlorence" };

const CATEGORY_LABELS: Record<string, string> = {
  antiques: "Antiques",
  breweries: "Breweries",
  restaurants: "Restaurants",
  activities: "Activities",
  art: "Art Galleries",
};

export default async function AdminDashboardPage() {
  const db = getDb();

  const [[{ total: totalListings }], [{ total: totalEvents }], [{ total: totalAdmins }]] =
    await Promise.all([
      db.select({ total: count() }).from(listings),
      db.select({ total: count() }).from(events),
      db.select({ total: count() }).from(admins),
    ]);

  const categoryCounts = await Promise.all(
    Object.keys(CATEGORY_LABELS).map(async (cat) => {
      const [{ total }] = await db
        .select({ total: count() })
        .from(listings)
        .where(eq(listings.category, cat as "antiques" | "breweries" | "restaurants" | "activities" | "art"));
      return { category: cat, total };
    })
  );

  const [{ total: featuredCount }] = await db
    .select({ total: count() })
    .from(listings)
    .where(eq(listings.featured, true));

  const recentListings = await db
    .select()
    .from(listings)
    .orderBy(listings.createdAt)
    .limit(5);

  const stats = [
    { label: "Total Listings", value: totalListings, icon: List, color: "#D4A853" },
    { label: "Featured", value: featuredCount, icon: Star, color: "#60A5FA" },
    { label: "Upcoming Events", value: totalEvents, icon: CalendarDays, color: "#A78BFA" },
    { label: "Admins", value: totalAdmins, icon: Users, color: "#34D399" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#F0F6FC" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8B949E" }}>
          VisitFlorence directory overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#161B22", borderColor: "#30363D" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wide" style={{ color: "#8B949E" }}>
                {label}
              </span>
              <Icon size={16} style={{ color }} />
            </div>
            <div className="text-3xl font-bold" style={{ color: "#F0F6FC" }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "#161B22", borderColor: "#30363D" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} style={{ color: "#D4A853" }} />
            <h2 className="font-semibold text-sm" style={{ color: "#F0F6FC" }}>
              Listings by Category
            </h2>
          </div>
          <div className="space-y-3">
            {categoryCounts.map(({ category, total }) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#8B949E" }}>
                  {CATEGORY_LABELS[category]}
                </span>
                <span
                  className="text-sm font-mono font-semibold"
                  style={{ color: "#F0F6FC" }}
                >
                  {total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent listings */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "#161B22", borderColor: "#30363D" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <List size={16} style={{ color: "#D4A853" }} />
              <h2 className="font-semibold text-sm" style={{ color: "#F0F6FC" }}>
                Recent Listings
              </h2>
            </div>
            <Link
              href="/admin/listings"
              className="text-xs font-mono"
              style={{ color: "#D4A853" }}
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "#F0F6FC" }}>
                    {listing.name}
                  </p>
                  <p className="text-xs font-mono" style={{ color: "#8B949E" }}>
                    {CATEGORY_LABELS[listing.category] ?? listing.category}
                  </p>
                </div>
                {listing.featured && (
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ backgroundColor: "rgba(212,168,83,0.15)", color: "#D4A853" }}
                  >
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Link
          href="/admin/listings"
          className="rounded-xl border p-4 flex items-center gap-3 transition-colors"
          style={{ borderColor: "#30363D", color: "#8B949E" }}
        >
          <List size={18} style={{ color: "#D4A853" }} />
          <span className="text-sm font-medium">Manage Listings</span>
        </Link>
        <Link
          href="/admin/events"
          className="rounded-xl border p-4 flex items-center gap-3 transition-colors"
          style={{ borderColor: "#30363D", color: "#8B949E" }}
        >
          <CalendarDays size={18} style={{ color: "#D4A853" }} />
          <span className="text-sm font-medium">Manage Events</span>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="rounded-xl border p-4 flex items-center gap-3 transition-colors"
          style={{ borderColor: "#30363D", color: "#8B949E" }}
        >
          <LayoutDashboard size={18} style={{ color: "#D4A853" }} />
          <span className="text-sm font-medium">View Site</span>
        </Link>
      </div>
    </div>
  );
}
