import Link from "next/link";
import { MapPin, Navigation, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Florence, CO",
  description:
    "Learn about Florence, Colorado — the Antique Capital of Colorado and site of Colorado's first commercial oil well, in Fremont County.",
};

const facts = [
  { label: "Founded", value: "1860s" },
  { label: "Population", value: "~3,800" },
  { label: "County", value: "Fremont County" },
  { label: "Elevation", value: "5,196 ft" },
  { label: "From Denver", value: "125 miles south" },
  { label: "From Pueblo", value: "45 miles west" },
  { label: "From Canon City", value: "8 miles east" },
  { label: "From Royal Gorge", value: "15 miles" },
];

const directions = [
  {
    from: "Denver / Colorado Springs",
    route: "I-25 South to Pueblo, then US-50 West through Canon City to Florence",
  },
  {
    from: "Pueblo",
    route: "US-50 West approximately 45 miles to Florence",
  },
  {
    from: "Cripple Creek / Victor",
    route: "Highway 67 South to Florence via the Gold Belt Tour",
  },
  {
    from: "Salida / Gunnison",
    route: "US-50 East through Canon City to Florence",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Florence, CO 81226
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-6"
          style={{ color: "#F5EDD6" }}
        >
          About Florence, Colorado
        </h1>
        <p className="text-lg leading-8" style={{ color: "#9B8374" }}>
          Nestled in the Arkansas River Valley in Fremont County, Colorado,
          Florence is a living piece of Western history — a Victorian-era mining
          and oil town that has transformed into one of the country&apos;s most
          remarkable antique destinations.
        </p>
      </div>

      {/* History */}
      <section className="mb-14 space-y-6">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#F5EDD6" }}
        >
          The Antique Capital of Colorado
        </h2>
        <p className="leading-8" style={{ color: "#9B8374" }}>
          Florence earned its title as the &ldquo;Antique Capital of Colorado&rdquo; through
          decades of growth in its Main Street antique trade. What began as
          a handful of shops selling old frontier goods has grown into a
          destination with over 100 antique dealers spread across historic
          storefronts along Main Street and the surrounding blocks.
        </p>
        <p className="leading-8" style={{ color: "#9B8374" }}>
          The town&apos;s remarkably intact Victorian commercial architecture — much
          of it dating to the 1880s and 1890s — provides an authentic backdrop
          for one of Colorado&apos;s most immersive antiquing experiences. Walking
          Florence&apos;s Main Street is itself a journey through history.
        </p>

        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "#2C1A0E", borderColor: "#C19A6B", borderWidth: 1 }}
        >
          <h3
            className="font-semibold mb-3"
            style={{ color: "#C19A6B" }}
          >
            Colorado&apos;s First Oil Town
          </h3>
          <p className="text-sm leading-7" style={{ color: "#9B8374" }}>
            Florence holds a remarkable place in American history: it was the
            site of Colorado&apos;s first commercial oil well, drilled in 1862 — and
            one of the earliest oil discoveries west of the Mississippi River.
            The Florence oil fields were actively producing petroleum decades
            before the famous Texas oil boom. Today, the historic oil derrick
            on Main Street stands as a monument to the town&apos;s industrial past.
          </p>
        </div>

        <p className="leading-8" style={{ color: "#9B8374" }}>
          Beyond antiques and history, Florence serves as a perfect base for
          exploring the Royal Gorge region. The Royal Gorge Bridge &amp; Park is
          just 15 minutes away, the Arkansas River runs nearby (world-class
          rafting and Gold Medal fly fishing), and the Gold Belt Tour Scenic
          Byway loops through the mountains to Cripple Creek and beyond.
        </p>
      </section>

      {/* Quick facts */}
      <section className="mb-14">
        <h2
          className="text-2xl font-bold tracking-tight mb-6"
          style={{ color: "#F5EDD6" }}
        >
          Quick Facts
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {facts.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
            >
              <div
                className="text-xs font-mono uppercase tracking-wide mb-1"
                style={{ color: "#9B8374" }}
              >
                {label}
              </div>
              <div className="font-semibold text-sm" style={{ color: "#F5EDD6" }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Getting here */}
      <section className="mb-14">
        <h2
          className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2"
          style={{ color: "#F5EDD6" }}
        >
          <Navigation size={22} style={{ color: "#C19A6B" }} />
          Getting to Florence
        </h2>
        <div className="space-y-4">
          {directions.map(({ from, route }) => (
            <div
              key={from}
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
            >
              <div
                className="font-semibold text-sm mb-1"
                style={{ color: "#F5EDD6" }}
              >
                From {from}
              </div>
              <div className="text-sm" style={{ color: "#9B8374" }}>
                {route}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm mt-4 font-mono" style={{ color: "#9B8374" }}>
          Florence address: Florence, CO 81226 &middot; Fremont County
        </p>
      </section>

      {/* CTA */}
      <section
        className="rounded-2xl border p-8 text-center"
        style={{
          background: "linear-gradient(135deg, #2C1A0E, #1C1210)",
          borderColor: "#3D2518",
        }}
      >
        <h2
          className="text-2xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Ready to Explore?
        </h2>
        <p className="mb-6" style={{ color: "#9B8374" }}>
          Browse our full directory of antique shops, breweries, restaurants,
          and activities.
        </p>
        <Link
          href="/antiques"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm min-h-[44px]"
          style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
        >
          Browse the Directory
          <ChevronRight size={16} />
        </Link>
      </section>
    </div>
  );
}
