"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0D1117" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <MapPin size={22} style={{ color: "#D4A853" }} />
          <span className="text-xl font-bold tracking-tight" style={{ color: "#F0F6FC" }}>
            VisitFlorence
          </span>
        </div>

        <div
          className="rounded-2xl border p-8"
          style={{ backgroundColor: "#161B22", borderColor: "#30363D" }}
        >
          <h1 className="text-lg font-semibold mb-6 text-center" style={{ color: "#F0F6FC" }}>
            Admin Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wide mb-1.5"
                style={{ color: "#8B949E" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
                style={{
                  backgroundColor: "#0D1117",
                  borderColor: "#30363D",
                  color: "#F0F6FC",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-mono uppercase tracking-wide mb-1.5"
                style={{ color: "#8B949E" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none min-h-[44px]"
                style={{
                  backgroundColor: "#0D1117",
                  borderColor: "#30363D",
                  color: "#F0F6FC",
                }}
              />
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: "#F85149" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold min-h-[44px] transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#D4A853", color: "#0D1117" }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
