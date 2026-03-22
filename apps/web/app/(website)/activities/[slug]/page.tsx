import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { ClaimThisListing } from "@/components/claim-button";
import { MapPin, Phone, Globe, Clock, ExternalLink, Compass, Star, Navigation, Calendar } from "lucide-react";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const db = getDb();
  const [listing] = await db
    .select()
    .from(listings)
    .where(and(eq(listings.slug, slug), eq(listings.category, "activities")))
    .limit(1);

  if (!listing) return { title: "Not Found" };

  return {
    title: `${listing.name} | Florence CO Activities`,
    description: listing.shortDescription,
    openGraph: {
      title: `${listing.name} | Things to Do Near Florence CO`,
      description: listing.shortDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: listing.name,
      description: listing.shortDescription,
    },
  };
}

const SISTER_SITES = [
  { label: "Royal Gorge Rafting", href: "https://royalgorgerafting.net", desc: "Class III–V whitewater" },
  { label: "Royal Gorge Zipline", href: "https://royalgorgeziplinetours.com", desc: "Gorge-spanning zip tours" },
  { label: "Royal Gorge Vacation Rentals", href: "https://royalgorgevacationrentals.com", desc: "Yurts & glamping" },
  { label: "Epic Adventures", href: "https://royalgorgeepicadventures.com", desc: "Multi-activity packages" },
  { label: "The Edge Zipline", href: "https://theedgezip.com", desc: "Sky-high zip experiences" },
  { label: "Whitewater Bar & Grill", href: "https://whitewaterbar.com", desc: "Riverside dining & live music" },
  { label: "Rooftop Social", href: "https://wwrooftopsocial.com", desc: "Downtown Canon City rooftop" },
];

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = getDb();

  const [listing] = await db
    .select()
    .from(listings)
    .where(and(eq(listings.slug, slug), eq(listings.category, "activities")))
    .limit(1);

  if (!listing) notFound();

  const gallery = (listing.gallery ?? []) as string[];

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-56 md:h-80 flex items-end"
        style={{
          background: listing.imageUrl
            ? `linear-gradient(to bottom, transparent 40%, #1C1210 100%), url(${listing.imageUrl}) center/cover`
            : "linear-gradient(135deg, #2C1A0E 0%, #3D2518 50%, #2C1A0E 100%)",
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 pb-6">
          <nav className="text-xs mb-3" aria-label="breadcrumb">
            <ol className="flex items-center gap-1.5 flex-wrap" style={{ color: "#9B8374" }}>
              <li><Link href="/" style={{ color: "#9B8374" }} className="hover:opacity-80">Florence CO</Link></li>
              <li>/</li>
              <li><Link href="/activities" style={{ color: "#9B8374" }} className="hover:opacity-80">Activities</Link></li>
              <li>/</li>
              <li style={{ color: "#F5EDD6" }}>{listing.name}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {listing.featured && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}>
                <Star size={10} /> Featured
              </span>
            )}
            {listing.tier === "sponsored" && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#B87333", color: "#1C1210" }}>Sponsored</span>
            )}
            {listing.tier === "premium" && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                style={{ borderColor: "#C19A6B", color: "#C19A6B" }}>Premium</span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ color: "#F5EDD6" }}>
            {listing.name}
          </h1>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-8">

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass size={16} style={{ color: "#C19A6B" }} />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest"
                style={{ color: "#C19A6B" }}>About This Activity</span>
            </div>
            <p className="leading-7 text-base" style={{ color: "#F5EDD6" }}>{listing.description}</p>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (listing.tier === "premium" || listing.tier === "sponsored") && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "#9B8374" }}>Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gallery.map((url, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border" style={{ borderColor: "#3D2518" }}>
                    <img src={url} alt={`${listing.name} photo ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Adventure Hub */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}>
            <div className="flex items-center gap-2 mb-3">
              <Navigation size={16} style={{ color: "#C19A6B" }} />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest"
                style={{ color: "#C19A6B" }}>Florence — Your Adventure Hub</span>
            </div>
            <p className="text-sm leading-6 mb-4" style={{ color: "#9B8374" }}>
              Florence is the closest town to Royal Gorge — just 15 minutes from world-class rafting,
              ziplining, and one of Colorado&apos;s most dramatic natural landmarks.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { place: "Royal Gorge", time: "15 min" },
                { place: "Cañon City", time: "15 min" },
                { place: "Pueblo", time: "45 min" },
                { place: "Colorado Springs", time: "75 min" },
              ].map(({ place, time }) => (
                <div key={place} className="text-center p-3 rounded-xl border"
                  style={{ borderColor: "#3D2518", backgroundColor: "#1C1210" }}>
                  <div className="text-lg font-bold mb-0.5" style={{ color: "#C19A6B" }}>{time}</div>
                  <div className="text-xs" style={{ color: "#9B8374" }}>{place}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sister Sites */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass size={16} style={{ color: "#C19A6B" }} />
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest"
                style={{ color: "#C19A6B" }}>More Adventures Near Florence</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SISTER_SITES.map((site) => (
                <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border transition-colors"
                  style={{ borderColor: "#3D2518", backgroundColor: "#2C1A0E" }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "#C19A6B")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "#3D2518")}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#F5EDD6" }}>{site.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#9B8374" }}>{site.desc}</div>
                  </div>
                  <ExternalLink size={14} style={{ color: "#9B8374" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Upgrade CTA */}
          {listing.tier === "free" && (
            <div className="rounded-2xl p-6 border text-center"
              style={{ backgroundColor: "#2C1A0E", borderColor: "#C19A6B" }}>
              <Compass size={28} className="mx-auto mb-3" style={{ color: "#C19A6B" }} />
              <h3 className="font-bold text-lg mb-2" style={{ color: "#F5EDD6" }}>Own {listing.name}?</h3>
              <p className="text-sm leading-6 mb-4" style={{ color: "#9B8374" }}>
                Upgrade to Premium to add your full description, photo gallery, booking link, and seasonal hours.
              </p>
              <Link href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm min-h-[44px] transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}>
                View Upgrade Options
              </Link>
            </div>
          )}

          {/* Claim */}
          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#3D2518" }}>
            <span className="text-xs" style={{ color: "#9B8374" }}>Is this your business?</span>
            <ClaimThisListing listingId={listing.id} businessName={listing.name} tier={listing.tier} />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="rounded-2xl border p-5 space-y-4 sticky top-6"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "#C19A6B" }} />
              <div>
                <div className="text-xs font-mono uppercase tracking-wide mb-0.5" style={{ color: "#9B8374" }}>Location</div>
                <div className="text-sm" style={{ color: "#F5EDD6" }}>{listing.address}</div>
              </div>
            </div>

            {listing.phone && (
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0" style={{ color: "#C19A6B" }} />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wide mb-0.5" style={{ color: "#9B8374" }}>Phone</div>
                  <a href={`tel:${listing.phone}`} className="text-sm hover:opacity-80" style={{ color: "#F5EDD6" }}>
                    {listing.phone}
                  </a>
                </div>
              </div>
            )}

            {listing.hours && (
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "#C19A6B" }} />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wide mb-0.5" style={{ color: "#9B8374" }}>Hours / Season</div>
                  <div className="text-sm whitespace-pre-line" style={{ color: "#F5EDD6" }}>{listing.hours}</div>
                </div>
              </div>
            )}

            {listing.website && (
              <div className="flex items-start gap-3">
                <Globe size={16} className="mt-0.5 shrink-0" style={{ color: "#C19A6B" }} />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wide mb-0.5" style={{ color: "#9B8374" }}>Website</div>
                  <a href={listing.website} target="_blank" rel="noopener noreferrer"
                    className="text-sm break-all hover:opacity-80" style={{ color: "#C19A6B" }}>
                    {listing.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
            )}

            {listing.bookingUrl && (
              <a href={listing.bookingUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm min-h-[44px] transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}>
                <Calendar size={14} /> Book Now
              </a>
            )}

            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address + " Florence CO")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-medium text-sm min-h-[44px] border transition-colors hover:opacity-80"
              style={{ borderColor: "#3D2518", color: "#9B8374" }}>
              <Navigation size={14} /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
