import Link from "next/link";
import { MapPin, ChevronRight, Store, Beer, Utensils, Mountain, Palette, Navigation, ChevronDown } from "lucide-react";
import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { ListingCard } from "@/components/listing-card";
import type { Metadata } from "next";

const FAQ_ITEMS = [
  {
    q: "What is Florence, Colorado known for?",
    a: "Florence is known as the Antique Capital of Colorado, with over 100 antique shops and dealers lining historic Main Street. It's also celebrated for its craft brewery scene, local art galleries, and its location just 15 minutes from the Royal Gorge — one of Colorado's most dramatic natural landmarks.",
  },
  {
    q: "How far is Florence from the Royal Gorge?",
    a: "Florence is only about 15 minutes (roughly 12 miles) from the Royal Gorge Bridge & Park — making it the closest town to the gorge, even closer than Cañon City. It's the perfect base for a Royal Gorge day trip.",
  },
  {
    q: "How many antique shops are in Florence, CO?",
    a: "Florence has over 100 antique shops, dealers, and galleries concentrated along a few blocks of Main Street. The density of antique stores is what earned it the official designation as the Antique Capital of Colorado.",
  },
  {
    q: "How far is Florence from Colorado Springs?",
    a: "Florence is approximately 75 miles (about 1 hour and 15 minutes) southwest of Colorado Springs via US-115.",
  },
  {
    q: "What outdoor activities are near Florence, CO?",
    a: "Florence is surrounded by world-class outdoor adventure. Within 15 minutes you can reach the Royal Gorge for whitewater rafting (Class III–V), zipline tours, and hiking. The Gold Belt Tour — a 100-mile Colorado scenic byway — starts in Florence and connects to Cripple Creek and Cañon City. The Arkansas River offers Gold Medal fly fishing just minutes away.",
  },
];


export const metadata: Metadata = {
  title: "Visit Florence, CO — Antique Capital of Colorado",
  description:
    "Discover Florence, Colorado — the Antique Capital of Colorado. 100+ antique shops, craft breweries, local dining, and adventure 15 minutes from the Royal Gorge.",
};

const categories = [
  {
    href: "/antiques",
    icon: Store,
    label: "Antique Shops",
    sub: "100+ shops on Main Street",
  },
  {
    href: "/breweries",
    icon: Beer,
    label: "Breweries",
    sub: "Local craft beer scene",
  },
  {
    href: "/restaurants",
    icon: Utensils,
    label: "Dining",
    sub: "Local flavors & classics",
  },
  {
    href: "/activities",
    icon: Mountain,
    label: "Activities",
    sub: "15 min from Royal Gorge",
  },
  {
    href: "/activities#gold-belt-tour",
    icon: Navigation,
    label: "Gold Belt Tour",
    sub: "100-mile scenic byway",
  },
  {
    href: "/about",
    icon: Palette,
    label: "Art & Culture",
    sub: "Galleries & local history",
  },
];

export default async function HomePage() {
  const db = getDb();
  const featuredListings = await db
    .select()
    .from(listings)
    .where(and(eq(listings.featured, true), ne(listings.tier, "sponsored")))
    .limit(6);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative px-4 py-24 md:py-36 text-center"
        style={{
          background:
            "linear-gradient(to bottom, #1C1210, #2C1A0E)",
          borderBottom: "1px solid #3D2518",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin size={16} style={{ color: "#C19A6B" }} />
            <span
              className="text-xs font-semibold font-mono uppercase tracking-[0.15em]"
              style={{ color: "#C19A6B" }}
            >
              Fremont County, Colorado
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
            style={{ color: "#F5EDD6" }}
          >
            The Antique Capital
            <br />
            <span style={{ color: "#C19A6B" }}>of Colorado</span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "#9B8374" }}
          >
            Florence is home to 100+ antique shops along historic Main Street,
            craft breweries, local dining, and Colorado adventure — all just 15
            minutes from the Royal Gorge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/antiques"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm transition-colors min-h-[44px]"
              style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
            >
              Browse Antique Shops
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm border transition-colors min-h-[44px]"
              style={{
                borderColor: "#3D2518",
                color: "#F5EDD6",
                backgroundColor: "transparent",
              }}
            >
              About Florence
            </Link>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2
          className="text-2xl font-bold tracking-tight mb-8"
          style={{ color: "#F5EDD6" }}
        >
          Explore Florence
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(({ href, icon: Icon, label, sub }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col gap-3 p-5 rounded-xl border transition-colors group min-h-[44px]"
              style={{
                backgroundColor: "#2C1A0E",
                borderColor: "#3D2518",
              }}
            >
              <Icon size={24} style={{ color: "#C19A6B" }} />
              <div>
                <div
                  className="font-semibold text-sm group-hover:text-amber-400 transition-colors"
                  style={{ color: "#F5EDD6" }}
                >
                  {label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#9B8374" }}>
                  {sub}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      {featuredListings.length > 0 && (
        <section
          className="py-16"
          style={{ borderTop: "1px solid #3D2518" }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: "#F5EDD6" }}
              >
                Featured Destinations
              </h2>
              <Link
                href="/antiques"
                className="text-sm flex items-center gap-1 transition-colors min-h-[44px] px-2"
                style={{ color: "#C19A6B" }}
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredListings.map((listing) => {
                const hrefMap: Record<string, string> = {
                  antiques: `/antiques/${listing.slug}`,
                  breweries: `/breweries`,
                  restaurants: `/restaurants`,
                  activities: `/activities`,
                  art: `/about`,
                  lodging: `/about`,
                  services: `/about`,
                };
                return (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    href={hrefMap[listing.category] ?? "/"}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Royal Gorge proximity CTA */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #2C1A0E, #1C1210)",
          borderTop: "1px solid #3D2518",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-6 px-3 py-1.5 rounded-full border"
            style={{ color: "#C19A6B", borderColor: "rgba(193,154,107,0.3)" }}
          >
            <MapPin size={12} />
            15 miles east of Canon City
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
            style={{ color: "#F5EDD6" }}
          >
            Gateway to the
            <span style={{ color: "#C19A6B" }}> Royal Gorge</span>
          </h2>
          <p className="text-base leading-7 mb-10" style={{ color: "#9B8374" }}>
            Florence sits at the eastern edge of the Royal Gorge region — just 15
            minutes from America&apos;s highest suspension bridge. Spend the morning
            antiquing on Main Street and the afternoon exploring 1,000-foot canyon
            walls, world-class whitewater, and the Gold Belt Tour scenic byway.
          </p>
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm min-h-[44px] transition-colors"
            style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
          >
            Explore Activities
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16"
        style={{ borderTop: "1px solid #3D2518" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2
            className="text-2xl font-bold tracking-tight mb-10"
            style={{ color: "#F5EDD6" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group border-b"
                style={{ borderColor: "#3D2518" }}
              >
                <summary
                  className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none min-h-[44px]"
                  style={{ color: "#F5EDD6" }}
                >
                  <span className="font-medium text-sm leading-6">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 transition-transform group-open:rotate-180"
                    style={{ color: "#C19A6B" }}
                  />
                </summary>
                <p
                  className="pb-5 text-sm leading-7"
                  style={{ color: "#9B8374" }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
