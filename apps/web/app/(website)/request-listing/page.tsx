"use client";

import { useState } from "react";
import { Search, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RequestListingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function set(k: keyof typeof form, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/listings/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle size={48} style={{ color: "#C19A6B", margin: "0 auto 16px" }} />
        <h1 className="text-2xl font-bold tracking-tight mb-3" style={{ color: "#F5EDD6" }}>
          Request Received
        </h1>
        <p className="leading-7 mb-6" style={{ color: "#9B8374" }}>
          Thanks! We&apos;ll look into adding <strong style={{ color: "#F5EDD6" }}>{form.businessName}</strong> to the directory and follow up within 48 hours.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm min-h-[44px]"
          style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Search size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Missing a Business?
          </span>
        </div>
        <h1
          className="text-3xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Request a Listing
        </h1>
        <p className="leading-7" style={{ color: "#9B8374" }}>
          Know a Florence business that&apos;s not listed here? Let us know and we&apos;ll add it within 48 hours.
          Business owners can also{" "}
          <Link href="/add-listing" style={{ color: "#C19A6B" }}>
            add their own listing
          </Link>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wide mb-1.5" style={{ color: "#9B8374" }}>
            Business Name *
          </label>
          <input
            type="text"
            required
            value={form.businessName}
            onChange={(e) => set("businessName", e.target.value)}
            placeholder="What's the business called?"
            className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518", color: "#F5EDD6" }}
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wide mb-1.5" style={{ color: "#9B8374" }}>
            Your Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518", color: "#F5EDD6" }}
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wide mb-1.5" style={{ color: "#9B8374" }}>
            Your Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518", color: "#F5EDD6" }}
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wide mb-1.5" style={{ color: "#9B8374" }}>
            Phone (optional)
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="(719) 555-0100"
            className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518", color: "#F5EDD6" }}
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wide mb-1.5" style={{ color: "#9B8374" }}>
            Anything else? (optional)
          </label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Address, hours, website, why it belongs here..."
            className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none resize-none"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518", color: "#F5EDD6" }}
          />
        </div>

        {error && (
          <p className="text-sm" style={{ color: "#F85149" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg py-3 font-semibold text-sm min-h-[44px] transition-opacity disabled:opacity-60"
          style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Sending…" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
