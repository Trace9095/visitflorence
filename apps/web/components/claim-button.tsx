"use client";

import { useState } from "react";
import { Flag, CheckCircle, Loader2, X } from "lucide-react";

export function ClaimThisListing({
  listingId,
  businessName,
  tier,
}: {
  listingId: number;
  businessName: string;
  tier: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

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
        body: JSON.stringify({
          businessName,
          name: form.name,
          email: form.email,
          phone: form.phone,
          listingId,
          message: `Claim request for listing ID ${listingId}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  if (tier !== "free") return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border min-h-[44px] transition-colors"
        style={{ borderColor: "#3D2518", color: "#9B8374" }}
      >
        <Flag size={14} />
        Claim This Listing
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="w-full max-w-md rounded-2xl border p-6"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
          >
            {!submitted ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-lg" style={{ color: "#F5EDD6" }}>
                    Claim This Listing
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                    style={{ color: "#9B8374" }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-sm mb-5 leading-6" style={{ color: "#9B8374" }}>
                  Is <strong style={{ color: "#F5EDD6" }}>{businessName}</strong> your business? Claim it to update your listing and unlock Premium features.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {(["name", "email", "phone"] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-mono uppercase tracking-wide mb-1" style={{ color: "#9B8374" }}>
                        {field === "name" ? "Your Name *" : field === "email" ? "Email *" : "Phone (optional)"}
                      </label>
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        required={field !== "phone"}
                        value={form[field]}
                        onChange={(e) => set(field, e.target.value)}
                        className="w-full rounded-lg px-3 py-2 text-sm border outline-none min-h-[44px]"
                        style={{ backgroundColor: "#1C1210", borderColor: "#3D2518", color: "#F5EDD6" }}
                      />
                    </div>
                  ))}
                  {error && <p className="text-sm" style={{ color: "#F85149" }}>{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 font-semibold text-sm min-h-[44px] transition-opacity disabled:opacity-60"
                    style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
                  >
                    {loading && <Loader2 size={14} className="animate-spin" />}
                    {loading ? "Sending…" : "Submit Claim"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle size={40} style={{ color: "#C19A6B", margin: "0 auto 12px" }} />
                <h2 className="font-bold text-lg mb-2" style={{ color: "#F5EDD6" }}>Claim Request Sent</h2>
                <p className="text-sm leading-6" style={{ color: "#9B8374" }}>
                  We&apos;ll verify and follow up at {form.email} within 48 hours.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold min-h-[44px]"
                  style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
