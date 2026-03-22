import Link from "next/link";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import type { Listing } from "@/lib/db/schema";

interface ListingCardProps {
  listing: Listing;
  href: string;
}

export function ListingCard({ listing, href }: ListingCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border transition-colors group"
      style={{
        backgroundColor: "#2C1A0E",
        borderColor: "#3D2518",
      }}
    >
      <div className="p-5">
        {listing.featured && (
          <span
            className="inline-block text-xs font-semibold font-mono px-2 py-0.5 rounded mb-3"
            style={{
              backgroundColor: "rgba(193,154,107,0.15)",
              color: "#C19A6B",
            }}
          >
            FEATURED
          </span>
        )}
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
