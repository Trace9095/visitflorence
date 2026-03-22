"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";

const links = [
  { href: "/antiques", label: "Antique Shops" },
  { href: "/breweries", label: "Breweries" },
  { href: "/restaurants", label: "Dining" },
  { href: "/activities", label: "Activities" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "#1C1210", borderBottom: "1px solid #3D2518" }}
    >
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-h-[44px]">
          <MapPin size={18} style={{ color: "#C19A6B" }} />
          <div>
            <span className="font-semibold text-sm" style={{ color: "#F5EDD6" }}>
              Visit Florence
            </span>
            <span
              className="hidden sm:block text-xs font-mono"
              style={{ color: "#9B8374" }}
            >
              Colorado
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm transition-colors min-h-[44px] flex items-center"
                style={{
                  color: active ? "#C19A6B" : "#9B8374",
                  backgroundColor: active
                    ? "rgba(193,154,107,0.1)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ color: "#9B8374" }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 pb-4"
          style={{ backgroundColor: "#1C1210", borderTop: "1px solid #3D2518" }}
        >
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-3 rounded-md text-sm min-h-[44px]"
                style={{
                  color: active ? "#C19A6B" : "#F5EDD6",
                  backgroundColor: active
                    ? "rgba(193,154,107,0.1)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
