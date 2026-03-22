import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Florence CO Travel Blog | Antiques, Royal Gorge & Local Guides",
  description:
    "Local travel guides for Florence, Colorado — the Antique Capital of CO. Tips for antique hunting, Royal Gorge adventures, dining, and weekend getaways just 15 minutes from the Royal Gorge.",
};

const posts = [
  {
    slug: "antique-capital-guide",
    title: "Florence CO: The Complete Guide to the Antique Capital of Colorado",
    excerpt:
      "With over 100 antique shops packed into a few historic downtown blocks, Florence is a treasure hunter's paradise. Here's everything you need to know for the perfect antique shopping day.",
    category: "Antiques",
    readTime: "6 min read",
    date: "March 2025",
  },
  {
    slug: "royal-gorge-day-trip",
    title: "Royal Gorge Day Trip from Florence: Your 15-Minute Gateway to Adventure",
    excerpt:
      "Florence is the closest town to the Royal Gorge — closer than Cañon City. Here's how to spend a perfect day: start with breakfast in Florence, then hit the gorge for rafting, ziplining, or hiking.",
    category: "Adventure",
    readTime: "7 min read",
    date: "February 2025",
  },
  {
    slug: "florence-brewing-company",
    title: "Florence Brewing Company: Craft Beer in the Heart of Antique Country",
    excerpt:
      "The Florence Brewing Company has become the social hub of downtown Florence. We sat down with the brewers to learn about their Colorado-inspired lineup and what makes this taproom special.",
    category: "Breweries",
    readTime: "4 min read",
    date: "January 2025",
  },
  {
    slug: "weekend-getaway-florence",
    title: "Perfect Weekend Getaway: Florence & the Royal Gorge Region",
    excerpt:
      "Two days, zero crowds, endless discovery. This itinerary covers antique hunting Friday evening, a full day of Royal Gorge adventure Saturday, and a leisurely Sunday brunch before heading home.",
    category: "Travel",
    readTime: "8 min read",
    date: "December 2024",
  },
  {
    slug: "gold-belt-tour-byway",
    title: "Gold Belt Tour Scenic Byway: A Drive Through Colorado History",
    excerpt:
      "The Gold Belt Tour connects Florence, Cripple Creek, and Cañon City through some of the most dramatic landscapes in Colorado. We drove all 130 miles — here's what to expect.",
    category: "Adventure",
    readTime: "5 min read",
    date: "November 2024",
  },
  {
    slug: "arkansas-river-fishing",
    title: "Arkansas River Fly Fishing Near Florence: A Local's Guide",
    excerpt:
      "The Arkansas River through Fremont County is one of Colorado's best Gold Medal fly fishing destinations. From the Bighorn Sheep Canyon section to the Royal Gorge, here's where to fish and what to expect.",
    category: "Activities",
    readTime: "5 min read",
    date: "October 2024",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Antiques: "#B87333",
  Adventure: "#800020",
  Breweries: "#C19A6B",
  Travel: "#9B8374",
  Activities: "#C19A6B",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} style={{ color: "#C19A6B" }} />
          <span className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: "#C19A6B" }}>Florence CO Travel Blog</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          style={{ color: "#F5EDD6" }}>
          Local Guides & Travel Tips
        </h1>
        <p className="text-base leading-7 max-w-2xl" style={{ color: "#9B8374" }}>
          Insider guides to antique hunting, Royal Gorge adventures, dining, and exploring
          the Florence &amp; Cañon City region — Colorado&apos;s most underrated destination.
        </p>
      </div>

      {/* Featured post */}
      <Link href={`/blog/${posts[0].slug}`}
        className="block rounded-2xl border p-6 mb-8 group transition-colors"
        style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
        onMouseOver={(e) => (e.currentTarget.style.borderColor = "#C19A6B")}
        onMouseOut={(e) => (e.currentTarget.style.borderColor = "#3D2518")}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: CATEGORY_COLORS[posts[0].category] ?? "#C19A6B", color: "#1C1210" }}>
            {posts[0].category}
          </span>
          <span className="text-xs font-mono" style={{ color: "#9B8374" }}>Featured</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:opacity-80 transition-opacity"
          style={{ color: "#F5EDD6" }}>
          {posts[0].title}
        </h2>
        <p className="text-sm leading-6 mb-4" style={{ color: "#9B8374" }}>{posts[0].excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs" style={{ color: "#9B8374" }}>
            <span className="flex items-center gap-1"><Clock size={11} /> {posts[0].readTime}</span>
            <span>{posts[0].date}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium"
            style={{ color: "#C19A6B" }}>
            Read more <ArrowRight size={14} />
          </span>
        </div>
      </Link>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.slice(1).map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="block rounded-2xl border p-5 group transition-colors"
            style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#C19A6B")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "#3D2518")}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[post.category] ?? "#C19A6B", color: "#1C1210" }}>
                {post.category}
              </span>
            </div>
            <h2 className="text-base font-bold tracking-tight mb-2 leading-5 group-hover:opacity-80 transition-opacity"
              style={{ color: "#F5EDD6" }}>
              {post.title}
            </h2>
            <p className="text-sm leading-6 mb-4 line-clamp-3" style={{ color: "#9B8374" }}>
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs" style={{ color: "#9B8374" }}>
                <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                <span>{post.date}</span>
              </div>
              <ArrowRight size={14} style={{ color: "#C19A6B" }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
