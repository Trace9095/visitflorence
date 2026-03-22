"use client";

import { useState } from "react";
import { Plus, Loader2, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const CATEGORIES = [
  { value: "antiques", label: "Antique Shop" },
  { value: "breweries", label: "Brewery / Bar" },
  { value: "restaurants", label: "Restaurant / Cafe" },
  { value: "activities", label: "Activity / Attraction" },
  { value: "art", label: "Art Gallery" },
  { value: "lodging", label: "Lodging / Hotel" },
  { value: "services", label: "Services / Other" },
];

const PLANS = [
  { value: "free", label: "Free — Basic listing", price: "$0" },
  { value: "premium", label: "Premium — Featured + gallery", price: "$99/mo" },
  { value: "sponsored", label: "Sponsored — Top placement", price: "$199/mo" },
];

export default function AddListingPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("free");

  const [form, setForm] = useState({
    name: "",
    category: "antiques",
    address: "",
    phone: "",
    website: "",
    hours: "",
    description: "",
    email: "",
    plan: "free",
  });

  function set(k: keyof typeof form, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/listings/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setSubmitted(true);
      }
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
          Listing Submitted!
        </h1>
        <p className="leading-7 mb-6" style={{ color: "#9B8374" }}>
          Thanks for submitting your business. We&apos;ll review and publish your free listing within 24 hours.
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
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Plus size={20} style={{ color: "#C19A6B" }} />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}
          >
            Florence Directory
          </span>
        </div>
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}
        >
          Add Your Business
        </h1>
        <p className="leading-7" style={{ color: "#9B8374" }}>
          List your Florence business and start reaching visitors today. Free listings are published within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Plan selection */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wide mb-3" style={{ color: "#9B8374" }}>
            Choose Plan
          </label>
          <div className="space-y-2">
            {PLANS.map((p) => (
              <label
                key={p.value}
                className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer min-h-[44px]"
                style={{
                  borderColor: plan === p.value ? "#C19A6B" : "#3D2518",
                  backgroundColor: plan === p.value ? "rgba(193,154,107,0.05)" : "#2C1A0E",
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value={p.value}
                  checked={plan === p.value}
                  onChange={() => setPlan(p.value)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: plan === p.value ? "#C19A6B" : "#3D2518" }}
                >
                  {plan === p.value && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#C19A6B" }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#F5EDD6" }}>
                    {p.label}
                  </p>
                </div>
                <span className="text-sm font-mono" style={{ color: "#C19A6B" }}>
                  {p.price}
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs mt-2 font-mono" style={{ color: "#9B8374" }}>
            <Link href="/pricing" className="underline" style={{ color: "#C19A6B" }}>
              Compare plans
            </Link>
            {" "}· Paid plans use Stripe · Cancel anytime
          </p>
        </div>

        {/* Business info */}
        <div className="grid gap-4">
          <Field label="Business Name *" required>
            <Input value={form.name} onChange={(v) => set("name", v)} placeholder="Florence Antique Mall" required />
          </Field>

          <Field label="Category *" required>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
              style={{ backgroundColor: "#1C1210", borderColor: "#3D2518", color: "#F5EDD6" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Address *" required>
            <Input value={form.address} onChange={(v) => set("address", v)} placeholder="123 Main St, Florence, CO 81226" required />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone">
              <Input value={form.phone} onChange={(v) => set("phone", v)} placeholder="(719) 555-0100" type="tel" />
            </Field>
            <Field label="Website">
              <Input value={form.website} onChange={(v) => set("website", v)} placeholder="https://yourbusiness.com" type="url" />
            </Field>
          </div>

          <Field label="Hours">
            <Input value={form.hours} onChange={(v) => set("hours", v)} placeholder="Mon–Sat 10am–5pm, Sun 12–4pm" />
          </Field>

          <Field label="Description *" required>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
              rows={4}
              placeholder="Describe your business in 2-3 sentences..."
              className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none resize-none"
              style={{ backgroundColor: "#1C1210", borderColor: "#3D2518", color: "#F5EDD6" }}
            />
          </Field>

          <Field label="Your Email *" required>
            <Input value={form.email} onChange={(v) => set("email", v)} placeholder="you@yourbusiness.com" type="email" required />
          </Field>
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
          {loading
            ? "Submitting…"
            : plan === "free"
            ? "Submit Free Listing"
            : `Continue to Payment — ${PLANS.find((p) => p.value === plan)?.price}`}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wide mb-1.5" style={{ color: "#9B8374" }}>
        {label}
        {required && <span style={{ color: "#F85149" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
      style={{ backgroundColor: "#1C1210", borderColor: "#3D2518", color: "#F5EDD6" }}
    />
  );
}
