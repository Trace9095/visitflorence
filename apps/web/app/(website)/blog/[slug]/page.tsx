import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
};

const POSTS: BlogPost[] = [
  {
    slug: "antique-capital-guide",
    title: "Florence CO: The Complete Guide to the Antique Capital of Colorado",
    excerpt: "With over 100 antique shops packed into a few historic downtown blocks, Florence is a treasure hunter's paradise.",
    category: "Antiques",
    readTime: "6 min read",
    date: "March 2025",
    content: `
Florence, Colorado has earned its title as the Antique Capital of Colorado — and it's not hard to see why. The entire downtown district is lined with multi-dealer malls, curated boutiques, and specialty shops that draw collectors from across the American West.

## Why Florence?

The story of Florence's antique scene begins in the late 1980s, when a handful of dealers converted empty storefronts along Pikes Peak Avenue into antique malls. Word spread, and within a decade Florence had become a destination. Today, you can spend an entire day weaving through shops without covering the same ground twice.

## The Must-Visit Shops

**Florence Antique Mall** is the anchor of the downtown district — a massive multi-dealer space with furniture, vintage glassware, estate jewelry, Western Americana, and military collectibles. Plan at least an hour here.

**Colorado Antique Gallery** specializes in mid-century modern furniture and industrial pieces. If you're looking for a Danish credenza or an Eames-era chair, this is your best bet in the region.

For smaller, curated collections, walk the side streets off Pikes Peak Avenue. Some of the best finds are in the smaller independent dealers who specialize in specific categories — vintage maps, old advertising signs, or 19th-century Colorado photography.

## Practical Tips

- **Arrive early.** The best pieces go to early birds. Serious collectors show up when the doors open.
- **Bring cash.** Many dealers offer a discount for cash purchases.
- **Ask about layaway.** For larger pieces, most dealers will hold an item with a deposit.
- **Check for parking.** Parking is free throughout downtown Florence — no meters, no time limits.
- **Plan for both days.** If you're driving from Denver or Colorado Springs, stay overnight and hit the shops fresh both Saturday and Sunday.

## The Best Time to Visit

Spring and fall are the sweet spots. Summer weekends get busy with Royal Gorge tourists who swing through Florence on their way back to the highway. Weekday visits in spring or fall give you a relaxed pace and more one-on-one time with dealers, who are often the best source of local history.

## After the Hunt

Florence Brewing Company is the natural endpoint of any antique day. Grab a pint, rest your legs, and celebrate your finds. Several good lunch spots are within a block of the main antique corridor.
    `,
  },
  {
    slug: "royal-gorge-day-trip",
    title: "Royal Gorge Day Trip from Florence: Your 15-Minute Gateway to Adventure",
    excerpt: "Florence is the closest town to the Royal Gorge — closer than Cañon City. Here's how to spend a perfect day.",
    category: "Adventure",
    readTime: "7 min read",
    date: "February 2025",
    content: `
Most people don't realize that Florence, not Cañon City, is actually the closest town to the Royal Gorge. The drive from downtown Florence to the Royal Gorge is about 15 minutes on US-50 — making Florence the ideal base for a day of adventure.

## The Royal Gorge Experience

The Royal Gorge is one of Colorado's most spectacular natural landmarks — a 1,000-foot-deep canyon carved by the Arkansas River over millions of years. The canyon is narrower than the Grand Canyon but arguably more dramatic: sheer granite walls that drop straight to the rushing river below, with the world-famous Royal Gorge Bridge spanning the gap 956 feet overhead.

## Rafting the Royal Gorge Section

The Royal Gorge section of the Arkansas River is Colorado's premier whitewater experience. Class III-V rapids through the tightest, deepest section of the canyon make this run a bucket-list experience.

**[Royal Gorge Rafting](https://royalgorgerafting.net)** offers half-day and full-day trips through the gorge. Trips run from May through September. Book in advance — summer dates sell out weeks ahead.

## Ziplining Over the Gorge

If rafting isn't your style, **[Royal Gorge Zipline Tours](https://royalgorgeziplinetours.com)** offers a different kind of thrill: zip lines that span the canyon, giving you a bird's-eye view of the gorge and river far below. The Classic course takes about two hours and is accessible to most fitness levels.

## The Royal Gorge Bridge & Park

The Royal Gorge Bridge & Park is a separate attraction on the canyon's south rim — a full entertainment complex built around the iconic suspension bridge. While it's more commercial than a backcountry adventure, the views from the bridge are unmatched, and the new Via Ferrata route lets the adventurous descend into the canyon itself.

## The Perfect Florence-to-Gorge Day

- **7:30 AM** — Breakfast at a Florence café (ask your lodging for the local favorite)
- **9:00 AM** — Check in for your rafting or zipline trip
- **9:30 AM–1:00 PM** — Royal Gorge adventure
- **1:30 PM** — Lunch in Florence or Cañon City
- **2:30 PM** — Browse the antique shops on Pikes Peak Avenue
- **5:00 PM** — Florence Brewing Company for a post-adventure pint
    `,
  },
  {
    slug: "florence-brewing-company",
    title: "Florence Brewing Company: Craft Beer in the Heart of Antique Country",
    excerpt: "The Florence Brewing Company has become the social hub of downtown Florence.",
    category: "Breweries",
    readTime: "4 min read",
    date: "January 2025",
    content: `
There's something fitting about a craft brewery anchoring the Antique Capital of Colorado. Florence Brewing Company draws on the same spirit that fills the antique shops lining Pikes Peak Avenue — a reverence for quality, history, and the handmade.

## The Taproom

The taproom occupies a renovated historic building in downtown Florence. The space is warm and relaxed — wood and exposed brick, long communal tables, a wraparound bar with a view of the brewing equipment. It's the kind of place where you walk in for one pint and find yourself still there two hours later.

## The Beers

The lineup rotates seasonally, but a few core beers have become fixtures. The Royal Gorge Red is the flagship — a malt-forward American amber that balances caramel sweetness with a dry, hoppy finish. It's named for the canyon 15 minutes west of town, and it drinks like a long day outdoors.

In summer, look for the Arkansas Wheat — a crisp, light-bodied wheat beer that pairs perfectly with a Florence antique-shopping day. Fall brings a rotating pumpkin stout that's become a local tradition.

## The Food

The kitchen keeps it simple and local: house-made pretzels with beer cheese, flatbreads with rotating toppings, charcuterie boards featuring Colorado-sourced meats and cheeses. Nothing elaborate — everything good.

## Why It Matters

Florence Brewing Company is more than a bar. On any given Friday evening, you'll find antique dealers comparing finds, rafting guides winding down after a long season, and locals who have been coming since the brewery opened. It's the community center of modern Florence.

If you're making the drive to Florence for the antiques or the Royal Gorge, build in time for a stop here. It's a 10-minute walk from the main antique corridor, and you'll leave with a better understanding of the town than any guidebook can give you.
    `,
  },
  {
    slug: "weekend-getaway-florence",
    title: "Perfect Weekend Getaway: Florence & the Royal Gorge Region",
    excerpt: "Two days, zero crowds, endless discovery. The ideal itinerary for a Florence weekend.",
    category: "Travel",
    readTime: "8 min read",
    date: "December 2024",
    content: `
Florence occupies a rare position in Colorado tourism: it's genuinely underrated. Ninety minutes from Denver, two hours from Albuquerque, 75 minutes from Colorado Springs — and most visitors drive past on US-50 without realizing what they're missing. Here's how to do it right.

## Friday Evening: Arrive in Florence

Arrive before sunset. Check in to your lodging (Florence has several B&Bs and vacation rentals; **[Royal Gorge Vacation Rentals](https://royalgorgevacationrentals.com)** offers yurts and glamping options just west of town). Walk downtown, stop in any antique shops still open, and end the evening at Florence Brewing Company.

## Saturday: The Royal Gorge

This is the adventure day. Options:

**Option A: Whitewater Rafting** — Book a morning trip with **[Royal Gorge Rafting](https://royalgorgerafting.net)**. The Royal Gorge section is Class III-V — challenging, spectacular, and worth every moment. Half-day trips get you back in Florence by early afternoon.

**Option B: Zipline** — **[Royal Gorge Zipline Tours](https://royalgorgeziplinetours.com)** runs morning and afternoon tours. The Classic course spans the canyon and takes about two hours.

**Option C: Multi-activity** — **[Royal Gorge Epic Adventures](https://royalgorgeepicadventures.com)** packages combine rafting, ziplines, and more into a full-day experience.

After your adventure, lunch in Cañon City (15 minutes from Florence), then head to the Royal Gorge Bridge & Park for the afternoon. Drive back through Florence in time for dinner.

**Dinner:** **[Whitewater Bar & Grill](https://whitewaterbar.com)** sits riverside in Cañon City, just 15 minutes from Florence — great food, cold drinks, and live music on weekends. Or stay in Florence and try one of the local restaurants on Pikes Peak Avenue.

## Sunday: Antique Country

Sunday is for the shops. Start early — 9 or 10 AM — when the best dealers are fully set up and you have the malls mostly to yourself. Hit the Florence Antique Mall first for an overview of the market, then work your way down Pikes Peak Avenue.

By 2 PM, grab lunch and head home. The drive back to Denver on US-285 through South Park is spectacular.

## Where to Stay

- **Florence downtown B&Bs:** Several within walking distance of the antique district
- **Royal Gorge Vacation Rentals:** Glamping yurts and Airstreams west of town — unique, well-run, and memorable
- **Cañon City hotels:** 15 minutes away with more chain options if that's your preference
    `,
  },
  {
    slug: "gold-belt-tour-byway",
    title: "Gold Belt Tour Scenic Byway: A Drive Through Colorado History",
    excerpt: "The Gold Belt Tour connects Florence, Cripple Creek, and Cañon City through 130 miles of dramatic Colorado landscape.",
    category: "Adventure",
    readTime: "5 min read",
    date: "November 2024",
    content: `
The Gold Belt Tour National Scenic Byway is one of Colorado's best-kept driving secrets. The 130-mile loop connects Florence, Cañon City, Cripple Creek, and Florissant through terrain that tells the story of Colorado's Gold Rush era — abandoned mines, ghost towns, dramatic canyon roads, and fossil beds that predate the Rockies themselves.

## The Route

Starting from Florence, the Gold Belt Tour follows three distinct historic roads:

**Phantom Canyon Road** (southernmost route) — A winding gravel road that climbs from Florence into the mountains, passing through Phantom Canyon where a narrow-gauge railroad once ran during the mining era. The canyon walls close in dramatically, and the old railroad grades are still visible.

**Shelf Road** (central route) — A shelf road carved into the canyon walls above Cañon City. This is the most dramatic section of the byway — a single-lane road with thousand-foot drops that requires confident driving and a willingness to back up for oncoming traffic at wider pull-outs.

**Fourmile Creek Road** (northernmost route) — A gentler approach from Cripple Creek that passes through historic ranching country before dropping back toward Cañon City.

## What to See

- **Cripple Creek** — Historic gold mining town at 9,500 feet with museums, historic districts, and views of the Sangre de Cristo Mountains
- **Florissant Fossil Beds National Monument** — Ancient lake deposits preserve giant petrified redwoods and thousands of insect and plant fossils
- **Temple Canyon Park** — Cañon City's most dramatic local canyon, often overlooked in favor of the Royal Gorge
- **Shelf Road Climbing Area** — One of Colorado's premier sport climbing destinations, with 800+ routes on limestone pockets above the canyon floor

## Practical Notes

Phantom Canyon Road is passable for standard passenger cars in dry conditions but gets slippery when wet — call ahead after heavy rain. Shelf Road is similarly accessible but narrow; larger vehicles should use Phantom Canyon instead.

Allow a full day for the complete loop. Florence is the natural starting and ending point — you can leave your lodging in the morning, complete the circuit, and return in time for dinner.
    `,
  },
  {
    slug: "arkansas-river-fishing",
    title: "Arkansas River Fly Fishing Near Florence: A Local's Guide",
    excerpt: "The Arkansas River through Fremont County is one of Colorado's best Gold Medal fly fishing destinations.",
    category: "Activities",
    readTime: "5 min read",
    date: "October 2024",
    content: `
The Arkansas River running through Fremont County is among the most productive fly fishing rivers in the Rocky Mountain West. The river runs for miles through varying terrain — from the wide meadow stretches above Florence to the tight canyon water of the Royal Gorge section — offering dramatically different fishing experiences within a short drive of downtown.

## Gold Medal Waters

Colorado designates certain river sections as "Gold Medal" — a recognition that the waters support exceptional populations of large, wild trout. The Arkansas River holds Gold Medal designation for nearly 100 miles through Fremont and Chaffee Counties.

The peak season runs from late spring through fall, with hatches occurring throughout the warmer months. The caddisfly hatches in June and July are legendary — fish rising everywhere you look.

## The Bighorn Sheep Canyon Section

From Salida east to Cañon City, the river runs through Bighorn Sheep Canyon — a dramatic section with Class II-III rapids that also holds exceptional brown and rainbow trout. This section is accessible from US-50 with multiple pull-outs and walk-in access points.

The water here tends to be slightly more technical than the meadow stretches upstream. Nymphing rigs dominate, but dry fly fishing is excellent during hatches.

## Near Florence

Just west of Florence, the river braids through a series of wide, gravel-bottomed runs that hold large brown trout. These slower, deeper pools are accessible by foot from several public access points.

## Access and Regulations

The Arkansas River is regulated as a catch-and-release, flies-and-lures-only stretch through the Gold Medal sections. Check current Colorado Parks & Wildlife regulations before your trip — size limits and season dates can vary by section.

Several local outfitters in Cañon City and Salida offer guided float trips and walk-wade guides. A half-day with a local guide is worth the investment for first-time visitors — the productive water isn't always obvious, and guides know the hatches.

## Best Access Points Near Florence

- **Florence River Access** — Public access just west of town with parking
- **Pathfinder Park (Cañon City)** — 15 minutes west with extended river access
- **Texas Creek** — 30 minutes west for the Bighorn Sheep Canyon section

The river fishes well almost any time of year, but late September through early November is special — the crowds are gone, the aspens are turning, and the trout are feeding aggressively before winter.
    `,
  },
];

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Visit Florence CO`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

const SISTER_SITES = [
  { label: "Royal Gorge Rafting", href: "https://royalgorgerafting.net" },
  { label: "Royal Gorge Zipline", href: "https://royalgorgeziplinetours.com" },
  { label: "RG Vacation Rentals", href: "https://royalgorgevacationrentals.com" },
  { label: "Epic Adventures", href: "https://royalgorgeepicadventures.com" },
  { label: "Whitewater Bar & Grill", href: "https://whitewaterbar.com" },
  { label: "Rooftop Social", href: "https://wwrooftopsocial.com" },
];

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold tracking-tight mt-8 mb-3" style={{ color: "#F5EDD6" }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**[")) {
      // Bold link pattern: **[Label](url)**
      const match = line.match(/^\*\*\[(.+?)\]\((.+?)\)\*\*(.*)$/);
      if (match) {
        elements.push(
          <p key={i} className="leading-7 mb-3" style={{ color: "#F5EDD6" }}>
            <a href={match[2]} target="_blank" rel="noopener noreferrer"
              className="font-semibold hover:opacity-80" style={{ color: "#C19A6B" }}>
              {match[1]}
            </a>
            {match[3]}
          </p>
        );
      }
    } else if (line.startsWith("**")) {
      const match = line.match(/^\*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <p key={i} className="leading-7 mb-3" style={{ color: "#F5EDD6" }}>
            <strong style={{ color: "#C19A6B" }}>{match[1]}</strong>
            {match[2]}
          </p>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="leading-7 ml-4 list-disc" style={{ color: "#F5EDD6" }}>
          {line.slice(2)}
        </li>
      );
    } else {
      elements.push(
        <p key={i} className="leading-7 mb-4" style={{ color: "#9B8374" }}>
          {line}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back */}
      <Link href="/blog"
        className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-80"
        style={{ color: "#9B8374" }}>
        <ArrowLeft size={14} /> Back to Blog
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#C19A6B", color: "#1C1210" }}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono" style={{ color: "#9B8374" }}>
            <Clock size={11} /> {post.readTime}
          </span>
          <span className="text-xs font-mono" style={{ color: "#9B8374" }}>{post.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4"
          style={{ color: "#F5EDD6" }}>
          {post.title}
        </h1>
        <p className="text-lg leading-7" style={{ color: "#9B8374" }}>{post.excerpt}</p>
      </div>

      {/* Divider */}
      <div className="h-px mb-10" style={{ backgroundColor: "#3D2518" }} />

      {/* Content + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Article */}
        <article className="lg:col-span-2">
          {renderContent(post.content)}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Distances */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#C19A6B" }}>Distance from Florence</h3>
            <div className="space-y-2">
              {[
                { place: "Royal Gorge", time: "15 min" },
                { place: "Cañon City", time: "15 min" },
                { place: "Pueblo", time: "45 min" },
                { place: "Colorado Springs", time: "75 min" },
              ].map(({ place, time }) => (
                <div key={place} className="flex items-center justify-between text-sm">
                  <span style={{ color: "#9B8374" }}>{place}</span>
                  <span className="font-semibold" style={{ color: "#C19A6B" }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Links */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#C19A6B" }}>Plan Your Visit</h3>
            <div className="space-y-2">
              {SISTER_SITES.map((site) => (
                <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm py-1 hover:opacity-80 transition-opacity">
                  <span style={{ color: "#F5EDD6" }}>{site.label}</span>
                  <ExternalLink size={12} style={{ color: "#9B8374" }} />
                </a>
              ))}
            </div>
          </div>

          {/* More posts */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: "#2C1A0E", borderColor: "#3D2518" }}>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#C19A6B" }}>More from the Blog</h3>
            <div className="space-y-3">
              {POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  className="block text-sm leading-5 hover:opacity-80 transition-opacity"
                  style={{ color: "#F5EDD6" }}>
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
