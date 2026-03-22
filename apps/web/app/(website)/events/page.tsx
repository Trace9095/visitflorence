import { getDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { gte } from "drizzle-orm";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events in Florence, Colorado — festivals, art walks, brewery events, and outdoor adventures.",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  festival: { bg: "rgba(193,154,107,0.15)", text: "#C19A6B" },
  outdoors: { bg: "rgba(59,130,246,0.15)", text: "#60A5FA" },
  brewery: { bg: "rgba(139,92,246,0.15)", text: "#A78BFA" },
  art: { bg: "rgba(236,72,153,0.15)", text: "#F472B6" },
  general: { bg: "rgba(107,114,128,0.15)", text: "#9CA3AF" },
};

export default async function EventsPage() {
  const db = getDb();
  const upcomingEvents = await db
    .select()
    .from(events)
    .where(gte(events.date, new Date()))
    .orderBy(events.date)
    .limit(20);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            What&apos;s Happening
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Events in Florence
        </h1>
        <p className="text-lg max-w-2xl leading-7" style={{ color: "#9B8374" }}>
          From the Florence Antique &amp; Art Festival to First Friday Art Walks and
          Gold Belt Tour drives, there&apos;s always something happening in the
          Antique Capital of Colorado.
        </p>
      </div>

      {upcomingEvents.length > 0 ? (
        <div className="space-y-5">
          {upcomingEvents.map((event) => {
            const colors =
              categoryColors[event.category] ?? categoryColors.general;
            return (
              <article
                key={event.id}
                className="rounded-xl border p-6"
                style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                        }}
                      >
                        {event.category}
                      </span>
                    </div>
                    <h2
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#F5EDD6" }}
                    >
                      {event.title}
                    </h2>
                    <p
                      className="text-sm leading-6 mb-4"
                      style={{ color: "#9B8374" }}
                    >
                      {event.description}
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#9B8374" }}>
                        <CalendarDays size={13} />
                        {formatDate(event.date)} &middot; {formatTime(event.date)}
                        {event.endDate && ` – ${formatTime(event.endDate)}`}
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#9B8374" }}>
                        <MapPin size={13} />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border min-h-[44px] transition-colors whitespace-nowrap"
                      style={{ borderColor: "#3D2518", color: "#C19A6B" }}
                    >
                      Details
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div
          className="text-center py-24 rounded-xl border"
          style={{ borderColor: "#3D2518" }}
        >
          <CalendarDays
            size={40}
            style={{ color: "#3D2518", margin: "0 auto 16px" }}
          />
          <p style={{ color: "#9B8374" }}>No upcoming events listed yet.</p>
          <p className="text-sm mt-2" style={{ color: "#9B8374" }}>
            Check back soon or visit Florence year-round.
          </p>
        </div>
      )}
    </div>
  );
}
