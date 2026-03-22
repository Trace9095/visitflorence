import { getDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events — Admin" };

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  festival: { bg: "rgba(212,168,83,0.15)", text: "#D4A853" },
  outdoors: { bg: "rgba(59,130,246,0.15)", text: "#60A5FA" },
  brewery: { bg: "rgba(139,92,246,0.15)", text: "#A78BFA" },
  art: { bg: "rgba(236,72,153,0.15)", text: "#F472B6" },
  general: { bg: "rgba(107,114,128,0.15)", text: "#9CA3AF" },
};

export default async function AdminEventsPage() {
  const db = getDb();
  const allEvents = await db.select().from(events).orderBy(events.date);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#F0F6FC" }}>
          Events
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8B949E" }}>
          {allEvents.length} total
        </p>
      </div>

      {allEvents.length > 0 ? (
        <div className="space-y-3">
          {allEvents.map((event) => {
            const colors = CATEGORY_COLORS[event.category] ?? CATEGORY_COLORS.general;
            return (
              <div
                key={event.id}
                className="rounded-xl border p-4 flex items-start justify-between gap-4"
                style={{ backgroundColor: "#161B22", borderColor: "#30363D" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {event.category}
                    </span>
                  </div>
                  <p className="font-semibold text-sm" style={{ color: "#F0F6FC" }}>
                    {event.title}
                  </p>
                  <p className="text-xs font-mono mt-1" style={{ color: "#8B949E" }}>
                    <CalendarDays size={11} className="inline mr-1" />
                    {formatDate(event.date)} · {event.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="rounded-xl border text-center py-16"
          style={{ borderColor: "#30363D", color: "#8B949E" }}
        >
          <CalendarDays size={32} style={{ margin: "0 auto 12px", color: "#30363D" }} />
          <p>No events yet.</p>
        </div>
      )}
    </div>
  );
}
