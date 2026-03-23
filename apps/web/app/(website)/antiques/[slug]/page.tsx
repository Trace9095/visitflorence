import { notFound } from "next/navigation";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  MapPin,
  Phone,
  Globe,
  Clock,
  ChevronLeft,
  Store,
  Star,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";
import { ClaimThisListing } from "@/components/claim-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const db = getDb();
  const [listing] = await db
    .select()
    .from(listings)
    .where(eq(listings.slug, slug))
    .limit(1);
  if (!listing) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://visitflorence.co";
  return {
    title: `${listing.name} — Florence, CO Antique Shop`,
    description:
      listing.shortDescription ||
      `${listing.name} is an antique shop in Florence, CO — the Antique Capital of Colorado. Just 15 minutes from the Royal Gorge.`,
    alternates: { canonical: `${siteUrl}/antiques/${slug}` },
    openGraph: {
      title: `${listing.name} — Florence, CO`,
      description: listing.shortDescription ?? undefined,
      url: `${siteUrl}/antiques/${slug}`,
      siteName: "VisitFlorence.co",
      type: "website",
    },
  };
}

const SISTER_SITES = [
  {
    name: "Royal Gorge Rafting",
    url: "https://royalgorgerafting.net",
    tagline: "Class III–V whitewater, 15 min away",
  },
  {
    name: "Royal Gorge Zipline Tours",
    url: "https://royalgorgeziplinetours.com",
    tagline: "Thrilling ziplines above the gorge",
  },
  {
    name: "Royal Gorge Vacation Rentals",
    url: "https://royalgorgevacationrentals.com",
    tagline: "Yurts, cabins & Airstreams",
  },
  {
    name: "Royal Gorge Epic Adventures",
    url: "https://royalgorgeepicadventures.com",
    tagline: "Multi-activity adventure packages",
  },
  {
    name: "Whitewater Bar & Grill",
    url: "https://whitewaterbar.com",
    tagline: "Riverside dining in Cañon City",
  },
  {
    name: "Rooftop Social",
    url: "https://wwrooftopsocial.com",
    tagline: "Rooftop bar + live music downtown",
  },
];

// Escape </script> sequences to prevent injection in JSON-LD blocks
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default async function AntiquePage({ params }: Props) {
  const { slug } = await params;
  const db = getDb();
  const [listing] = await db
    .select()
    .from(listings)
    .where(eq(listings.slug, slug))
    .limit(1);

  if (!listing) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://visitflorence.co";
  const gallery = (listing.gallery as string[] | null) ?? [];
  const isSponsored = listing.tier === "sponsored";
  const isPremium = listing.tier === "premium" || isSponsored;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AntiqueShop",
    name: listing.name,
    description: listing.description,
    address: listing.address
      ? {
          "@type": "PostalAddress",
          streetAddress: listing.address,
          addressLocality: "Florence",
          addressRegion: "CO",
          addressCountry: "US",
        }
      : undefined,
    telephone: listing.phone ?? undefined,
    url: listing.website ?? `${siteUrl}/antiques/${slug}`,
    openingHours: listing.hours ?? undefined,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.3894,
      longitude: -105.1186,
    },
    areaServed: {
      "@type": "City",
      name: "Florence",
      containedInPlace: { "@type": "State", name: "Colorado" },
    },
    nearbyAttractions: [
      { "@type": "TouristAttraction", name: "Royal Gorge Bridge & Park" },
      { "@type": "TouristAttraction", name: "Royal Gorge River" },
    ],
  };

  return (
    <>
      {/* JSON-LD — all values are database-sourced; < chars escaped to prevent injection */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="breadcrumb">
          <Link href="/" className="transition-colors" style={{ color: "#9B8374" }}>
            Home
          </Link>
          <span style={{ color: "#3D2518" }}>/</span>
          <Link href="/antiques" className="transition-colors" style={{ color: "#9B8374" }}>
            Antique Shops
          </Link>
          <span style={{ color: "#3D2518" }}>/</span>
          <span style={{ color: "#F5EDD6" }}>{listing.name}</span>
        </nav>

        <div className="grid md:grid-cols-3 gap-10">
          {/* ── Main content ── */}
          <div className="md:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {isSponsored && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold font-mono px-2 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(193,154,107,0.2)", color: "#C19A6B" }}
                  >
                    <Star size={10} />
                    SPONSORED
                  </span>
                )}
                {isPremium && !isSponsored && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold font-mono px-2 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(193,154,107,0.15)", color: "#C19A6B" }}
                  >
                    <Zap size={10} />
                    FEATURED
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  <Store size={14} style={{ color: "#C19A6B" }} />
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: "#C19A6B" }}
                  >
                    Antique Shop · Florence, CO
                  </span>
                </div>
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                style={{ color: "#F5EDD6" }}
              >
                {listing.name}
              </h1>
              <p className="text-base leading-7" style={{ color: "#9B8374" }}>
                {listing.description}
              </p>
            </div>

            {/* Gallery (premium/sponsored only) */}
            {isPremium && gallery.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold font-mono uppercase tracking-wide mb-3"
                  style={{ color: "#9B8374" }}
                >
                  Photos
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {gallery.slice(0, 6).map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden border"
                      style={{ borderColor: "#3D2518" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${listing.name} photo ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Royal Gorge proximity callout */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#1C1210", borderColor: "#3D2518" }}
            >
              <h2
                className="text-sm font-semibold font-mono uppercase tracking-wide mb-3"
                style={{ color: "#C19A6B" }}
              >
                Florence — Gateway to the Royal Gorge
              </h2>
              <p className="text-sm leading-6 mb-4" style={{ color: "#9B8374" }}>
                Florence is the{" "}
                <strong style={{ color: "#F5EDD6" }}>closest town to the Royal Gorge</strong> —
                just <strong style={{ color: "#F5EDD6" }}>15 minutes away</strong>. After browsing
                antiques, experience world-class whitewater rafting, ziplines, and one of
                Colorado&apos;s most dramatic landscapes. Pueblo is 45 minutes south; Colorado
                Springs is 75 minutes north. Florence is your base camp.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "Royal Gorge Bridge", dist: "15 min", highlight: true },
                  { label: "Cañon City", dist: "15 min", highlight: true },
                  { label: "Pueblo", dist: "45 min", highlight: false },
                  { label: "Colorado Springs", dist: "75 min", highlight: false },
                ].map(({ label, dist, highlight }) => (
                  <div
                    key={label}
                    className="rounded-lg px-3 py-2 text-center text-xs"
                    style={{ backgroundColor: "#2C1A0E", color: "#9B8374" }}
                  >
                    <div
                      className="font-mono text-base font-bold"
                      style={{ color: highlight ? "#C19A6B" : "#F5EDD6" }}
                    >
                      {dist}
                    </div>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Sister site links */}
            <div>
              <h2
                className="text-base font-bold tracking-tight mb-2"
                style={{ color: "#F5EDD6" }}
              >
                Make a Weekend of It
              </h2>
              <p className="text-sm leading-6 mb-5" style={{ color: "#9B8374" }}>
                Just 15 minutes from Florence, the Royal Gorge region offers Colorado&apos;s best
                outdoor adventures. Pair your antique day with whitewater rafting, ziplines, or a
                stay in a riverside yurt.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SISTER_SITES.map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm min-h-[52px] transition-colors group"
                    style={{ borderColor: "#3D2518", backgroundColor: "#2C1A0E" }}
                  >
                    <div>
                      <div
                        className="font-semibold group-hover:text-[#C19A6B] transition-colors"
                        style={{ color: "#F5EDD6" }}
                      >
                        {site.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "#9B8374" }}>
                        {site.tagline}
                      </div>
                    </div>
                    <ExternalLink size={14} style={{ color: "#9B8374", flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Upgrade CTA (free tier only) */}
            {listing.tier === "free" && (
              <div
                className="rounded-xl border p-6"
                style={{
                  backgroundColor: "rgba(193,154,107,0.05)",
                  borderColor: "rgba(193,154,107,0.3)",
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: "#F5EDD6" }}>
                  Is this your business?
                </h3>
                <p className="text-sm leading-6 mb-4" style={{ color: "#9B8374" }}>
                  Upgrade to{" "}
                  <strong style={{ color: "#C19A6B" }}>Premium ($99/mo)</strong> or{" "}
                  <strong style={{ color: "#C19A6B" }}>Sponsored ($199/mo)</strong> to add photos,
                  featured placement, and direct booking links.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm min-h-[44px] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
                >
                  View Upgrade Options
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* Info card */}
            <div
              className="rounded-xl border p-6 space-y-4"
              style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
            >
              {listing.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} style={{ color: "#C19A6B", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wide mb-1"
                      style={{ color: "#9B8374" }}
                    >
                      Address
                    </div>
                    <div className="text-sm" style={{ color: "#F5EDD6" }}>
                      {listing.address}
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        listing.address + ", Florence, CO"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs mt-1 inline-block"
                      style={{ color: "#C19A6B" }}
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              )}
              {listing.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={16} style={{ color: "#C19A6B", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wide mb-1"
                      style={{ color: "#9B8374" }}
                    >
                      Phone
                    </div>
                    <a
                      href={`tel:${listing.phone}`}
                      className="text-sm font-mono"
                      style={{ color: "#F5EDD6" }}
                    >
                      {listing.phone}
                    </a>
                  </div>
                </div>
              )}
              {listing.hours && (
                <div className="flex items-start gap-3">
                  <Clock size={16} style={{ color: "#C19A6B", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wide mb-1"
                      style={{ color: "#9B8374" }}
                    >
                      Hours
                    </div>
                    <div className="text-sm whitespace-pre-line" style={{ color: "#F5EDD6" }}>
                      {listing.hours}
                    </div>
                  </div>
                </div>
              )}
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-center justify-center min-h-[44px] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
                >
                  <Globe size={14} />
                  Visit Website
                </a>
              )}
            </div>

            {/* Claim / upgrade */}
            <ClaimThisListing
              listingId={listing.id}
              businessName={listing.name}
              tier={listing.tier}
            />

            {/* Florence context */}
            <div
              className="rounded-xl border p-4 text-sm leading-6"
              style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518", color: "#9B8374" }}
            >
              <div
                className="font-semibold text-xs uppercase tracking-wide mb-2 font-mono"
                style={{ color: "#C19A6B" }}
              >
                About Florence, CO
              </div>
              Florence is the{" "}
              <strong style={{ color: "#F5EDD6" }}>Antique Capital of Colorado</strong> — dozens of
              shops along Pikes Peak Avenue. It&apos;s also the closest town to the{" "}
              <strong style={{ color: "#F5EDD6" }}>Royal Gorge</strong> (15 min), making it the
              perfect base for an adventure weekend.
            </div>

            <Link
              href="/antiques"
              className="inline-flex items-center gap-2 text-sm min-h-[44px] px-1 transition-colors"
              style={{ color: "#9B8374" }}
            >
              <ChevronLeft size={16} />
              All Antique Shops
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
