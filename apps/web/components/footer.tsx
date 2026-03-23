import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";

const SISTER_SITES = [
  { label: "Royal Gorge Rafting", href: "https://royalgorgerafting.net" },
  { label: "Royal Gorge Zipline", href: "https://royalgorgeziplinetours.com" },
  { label: "RG Vacation Rentals", href: "https://royalgorgevacationrentals.com" },
  { label: "Epic Adventures", href: "https://royalgorgeepicadventures.com" },
  { label: "Whitewater Bar & Grill", href: "https://whitewaterbar.com" },
  { label: "Rooftop Social", href: "https://wwrooftopsocial.com" },
];

const sections = [
  {
    title: "Directory",
    links: [
      { href: "/antiques", label: "Antique Shops" },
      { href: "/breweries", label: "Breweries" },
      { href: "/restaurants", label: "Dining" },
      { href: "/activities", label: "Activities" },
      { href: "/events", label: "Events" },
      { href: "/blog", label: "Travel Blog" },
    ],
  },
  {
    title: "Florence",
    links: [
      { href: "/about", label: "About Florence" },
      { href: "/pricing", label: "List Your Business" },
      { href: "/request-listing", label: "Request a Listing" },
      { href: "/add-listing", label: "Add Your Business" },
      { href: "/activities#royal-gorge", label: "Royal Gorge" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2C1A0E",
        borderTop: "1px solid #3D2518",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MapPin size={18} style={{ color: "#C19A6B" }} />
              <span className="font-semibold" style={{ color: "#F5EDD6" }}>
                Visit Florence, CO
              </span>
            </Link>
            <p className="text-sm leading-6" style={{ color: "#9B8374" }}>
              The Antique Capital of Colorado. Discover 100+ antique shops,
              craft breweries, local dining, and adventure just 15 minutes from
              the Royal Gorge.
            </p>
          </div>

          {/* Sister sites */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#C19A6B" }}>
              Nearby Adventures
            </h3>
            <ul className="space-y-2">
              {SISTER_SITES.map((site) => (
                <li key={site.href}>
                  <a href={site.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm inline-flex items-center gap-1.5 transition-colors hover:text-white"
                    style={{ color: "#9B8374" }}>
                    <ExternalLink size={11} />
                    {site.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#C19A6B" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#9B8374" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid #3D2518" }}
        >
          <p className="text-xs font-mono" style={{ color: "#9B8374" }}>
            Florence, CO 81226 &middot; Fremont County, Colorado
          </p>
          <p className="text-xs" style={{ color: "#9B8374" }}>
            &copy; {new Date().getFullYear()} Visit Florence, CO
          </p>
        </div>
      </div>
    </footer>
  );
}
