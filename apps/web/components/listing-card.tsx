"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Globe, Clock, Store, Beer, Utensils, Mountain, Palette, BedDouble, Wrench } from "lucide-react";
import type { Listing } from "@/lib/db/schema";

interface ListingCardProps {
  listing: Listing;
  href: string;
}

const CATEGORY_META: Record<
  string,
  { gradient: string; icon: React.ElementType; label: string }
> = {
  antiques: {
    gradient: "linear-gradient(135deg, #2D1A08 0%, #3D2818 50%, #2A1E12 100%)",
    icon: Store,
    label: "Antiques",
  },
  breweries: {
    gradient: "linear-gradient(135deg, #0B1F14 0%, #143020 50%, #0D2416 100%)",
    icon: Beer,
    label: "Brewery",
  },
  restaurants: {
    gradient: "linear-gradient(135deg, #1F0D08 0%, #2E160C 50%, #201008 100%)",
    icon: Utensils,
    label: "Dining",
  },
  activities: {
    gradient: "linear-gradient(135deg, #091828 0%, #0F2540 50%, #0A1C2E 100%)",
    icon: Mountain,
    label: "Activities",
  },
  art: {
    gradient: "linear-gradient(135deg, #180D2A 0%, #241040 50%, #1C0D30 100%)",
    icon: Palette,
    label: "Art",
  },
  lodging: {
    gradient: "linear-gradient(135deg, #0A1624 0%, #102030 50%, #0C1820 100%)",
    icon: BedDouble,
    label: "Lodging",
  },
  services: {
    gradient: "linear-gradient(135deg, #181818 0%, #222222 50%, #1A1A1A 100%)",
    icon: Wrench,
    label: "Services",
  },
};

function CategoryFallback({ category }: { category: string }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.services;
  const Icon = meta.icon;
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: meta.gradient }}
    >
      <Icon size={28} style={{ color: "rgba(193,154,107,0.6)" }} />
      <span
        className="text-xs font-mono uppercase tracking-widest"
        style={{ color: "rgba(193,154,107,0.45)" }}
      >
        {meta.label}
      </span>
    </div>
  );
}

function ListingImage({
  imageUrl,
  name,
  category,
}: {
  imageUrl: string | null | undefined;
  name: string;
  category: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!imageUrl || failed) {
    return <CategoryFallback category={category} />;
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export function ListingCard({ listing, href }: ListingCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border overflow-hidden transition-colors group"
      style={{
        backgroundColor: "#2C1A0E",
        borderColor: "#3D2518",
      }}
    >
      {/* Image / gradient hero */}
      <div className="relative w-full overflow-hidden" style={{ height: 160 }}>
        <ListingImage
          imageUrl={listing.imageUrl}
          name={listing.name}
          category={listing.category}
        />
        {listing.featured && (
          <span
            className="absolute top-2.5 left-2.5 text-xs font-semibold font-mono px-2 py-0.5 rounded"
            style={{
              backgroundColor: "rgba(28,18,8,0.85)",
              color: "#C19A6B",
              backdropFilter: "blur(4px)",
            }}
          >
            FEATURED
          </span>
        )}
      </div>

      {/* Text content */}
      <div className="p-5">
        <h3
          className="font-semibold text-base leading-snug mb-2 group-hover:text-amber-400 transition-colors"
          style={{ color: "#F5EDD6" }}
        >
          {listing.name}
        </h3>
        <p className="text-sm leading-5 mb-4" style={{ color: "#9B8374" }}>
          {listing.shortDescription}
        </p>

        <div className="space-y-1.5">
          {listing.address && (
            <div className="flex items-start gap-2">
              <MapPin size={13} style={{ color: "#9B8374", marginTop: 2, flexShrink: 0 }} />
              <span className="text-xs" style={{ color: "#9B8374" }}>
                {listing.address}
              </span>
            </div>
          )}
          {listing.phone && (
            <div className="flex items-center gap-2">
              <Phone size={13} style={{ color: "#9B8374", flexShrink: 0 }} />
              <span className="text-xs font-mono" style={{ color: "#9B8374" }}>
                {listing.phone}
              </span>
            </div>
          )}
          {listing.website && (
            <div className="flex items-center gap-2">
              <Globe size={13} style={{ color: "#C19A6B", flexShrink: 0 }} />
              <span className="text-xs" style={{ color: "#C19A6B" }}>
                Website
              </span>
            </div>
          )}
          {listing.hours && (
            <div className="flex items-start gap-2">
              <Clock size={13} style={{ color: "#9B8374", marginTop: 2, flexShrink: 0 }} />
              <span className="text-xs" style={{ color: "#9B8374" }}>
                {listing.hours}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
