import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const listingsData: schema.NewListing[] = [
  // --- ANTIQUE SHOPS ---
  {
    name: "Arkansas Valley Antiques",
    slug: "arkansas-valley-antiques",
    category: "antiques",
    shortDescription: "Three floors of Colorado's finest antiques and collectibles.",
    description:
      "One of Florence's largest antique destinations, Arkansas Valley Antiques spans three floors of carefully curated furniture, pottery, Western Americana, vintage jewelry, and Colorado collectibles. A must-visit on any antique tour of Main Street.",
    address: "104 W Main St, Florence, CO 81226",
    phone: "(719) 784-3422",
    website: null,
    hours: "Mon-Sat 10am-5pm, Sun 11am-4pm",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Colorado Antique Center",
    slug: "colorado-antique-center",
    category: "antiques",
    shortDescription: "Multi-dealer antique mall with 10,000 sq ft of treasures.",
    description:
      "Colorado Antique Center hosts dozens of independent dealers under one roof, offering everything from Victorian furniture to mid-century modern, vintage tools, comic books, and oil-era memorabilia celebrating Florence's history as Colorado's first oil town.",
    address: "201 W Main St, Florence, CO 81226",
    phone: "(719) 784-6500",
    website: null,
    hours: "Daily 10am-5pm",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Canyon Street Antiques",
    slug: "canyon-street-antiques",
    category: "antiques",
    shortDescription: "Primitives, farm artifacts, and rustic Colorado pieces.",
    description:
      "Specializing in American primitives, farm implements, and rustic Colorado pieces, Canyon Street Antiques is a favorite among collectors seeking authentic frontier and ranch history. Their selection of wooden furniture and hand-forged ironwork is unmatched.",
    address: "108 E Main St, Florence, CO 81226",
    phone: null,
    website: null,
    hours: "Thu-Mon 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Main Street Finds",
    slug: "main-street-finds",
    category: "antiques",
    shortDescription: "Vintage clothing, linens, and household treasures.",
    description:
      "Main Street Finds is the go-to shop for vintage textiles, period clothing, quilts, and household linens. Their rotating inventory keeps regulars coming back, and they're known for their exceptional vintage kitchen and farmhouse collections.",
    address: "115 W Main St, Florence, CO 81226",
    phone: "(719) 784-7100",
    website: null,
    hours: "Wed-Sun 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "River Valley Antique Mall",
    slug: "river-valley-antique-mall",
    category: "antiques",
    shortDescription: "Largest multi-dealer mall in Fremont County.",
    description:
      "River Valley Antique Mall is home to over 40 dealers offering everything from fine china and silver to vintage toys, records, and oil memorabilia. The friendly, knowledgeable staff make it easy to find exactly what you're looking for.",
    address: "302 W Main St, Florence, CO 81226",
    phone: "(719) 784-2200",
    website: null,
    hours: "Daily 9am-6pm",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Heritage House Antiques",
    slug: "heritage-house-antiques",
    category: "antiques",
    shortDescription: "Victorian and Edwardian furniture specialists.",
    description:
      "Heritage House Antiques focuses on quality Victorian and Edwardian period furniture and decorative arts. Their carefully restored pieces include parlor sets, bedroom suites, and architectural salvage from historic Colorado homes.",
    address: "220 N Coal Creek Ave, Florence, CO 81226",
    phone: null,
    website: null,
    hours: "Fri-Sun 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "The Vintage Vault",
    slug: "the-vintage-vault",
    category: "antiques",
    shortDescription: "Mid-century modern and retro collectibles.",
    description:
      "The Vintage Vault specializes in mid-century modern furniture, lighting, and decor from the 1940s through the 1970s. Their curated selection of Eames-era pieces, Atomic Age kitchenware, and vintage advertising is a treasure trove for modern collectors.",
    address: "175 E Main St, Florence, CO 81226",
    phone: "(719) 784-9900",
    website: null,
    hours: "Tue-Sun 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Rustic Barn Antiques",
    slug: "rustic-barn-antiques",
    category: "antiques",
    shortDescription: "Country farmhouse and Western collectibles.",
    description:
      "Rustic Barn Antiques brings the Colorado ranch life indoors with an incredible selection of Western saddles, rodeo memorabilia, brand irons, cowboy gear, and farmhouse furniture. A true celebration of the American West.",
    address: "438 W Main St, Florence, CO 81226",
    phone: null,
    website: null,
    hours: "Sat-Sun 10am-4pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Fremont County Antique Mall",
    slug: "fremont-county-antique-mall",
    category: "antiques",
    shortDescription: "50+ dealers, something for every collector.",
    description:
      "With over 50 dealers spread across a historic commercial building, Fremont County Antique Mall is one of the most comprehensive antique destinations in southern Colorado. From fine art to kitchen collectibles, their inventory changes weekly.",
    address: "250 E Main St, Florence, CO 81226",
    phone: "(719) 784-4400",
    website: null,
    hours: "Mon-Sat 10am-5pm, Sun 11am-4pm",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Old Town Treasures",
    slug: "old-town-treasures",
    category: "antiques",
    shortDescription: "Colorado oil town memorabilia and local history.",
    description:
      "Old Town Treasures celebrates Florence's rich history as the site of Colorado's first commercial oil well. Their collection of oil-era equipment, photographs, documents, and local artifacts is unmatched anywhere in the state.",
    address: "130 W Main St, Florence, CO 81226",
    phone: "(719) 784-5500",
    website: null,
    hours: "Daily 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Mountain State Collectibles",
    slug: "mountain-state-collectibles",
    category: "antiques",
    shortDescription: "Native American art, pottery, and Southwest collectibles.",
    description:
      "Mountain State Collectibles specializes in Southwestern and Native American art, pottery, turquoise jewelry, and regional artifacts. Their selection of Pueblo pottery and Navajo textiles draws collectors from across the country.",
    address: "190 W Main St, Florence, CO 81226",
    phone: null,
    website: null,
    hours: "Thu-Mon 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "The Book Nook & Antiques",
    slug: "the-book-nook-antiques",
    category: "antiques",
    shortDescription: "Rare books, maps, and paper ephemera.",
    description:
      "The Book Nook & Antiques combines a curated collection of rare and used books with antique maps, postcards, vintage magazines, and paper ephemera. A paradise for bibliophiles and history buffs alike.",
    address: "145 W Main St, Florence, CO 81226",
    phone: "(719) 784-1234",
    website: null,
    hours: "Wed-Sun 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Silver & Gold Jewelers",
    slug: "silver-gold-jewelers",
    category: "antiques",
    shortDescription: "Estate jewelry, coins, and precious metal dealers.",
    description:
      "Silver & Gold Jewelers buys and sells estate jewelry, coins, and precious metals. Their inventory of Victorian, Art Deco, and retro jewelry pieces is exceptional, and they offer free appraisals on walk-in items.",
    address: "160 E Main St, Florence, CO 81226",
    phone: "(719) 784-6600",
    website: null,
    hours: "Mon-Sat 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Americana Depot",
    slug: "americana-depot",
    category: "antiques",
    shortDescription: "Patriotic, military, and Americana collectibles.",
    description:
      "Americana Depot specializes in military memorabilia, patriotic collectibles, vintage political campaign items, and Americana. Their WWII-era collection is particularly impressive, drawing collectors and veterans alike.",
    address: "275 W Main St, Florence, CO 81226",
    phone: null,
    website: null,
    hours: "Fri-Mon 10am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "The Glass Menagerie",
    slug: "the-glass-menagerie",
    category: "antiques",
    shortDescription: "Art glass, Depression glass, and vintage crystal.",
    description:
      "The Glass Menagerie is Florence's premier destination for vintage glassware. Their extensive collection of Depression glass, carnival glass, art glass, and mid-century crystal is one of the most complete in Colorado.",
    address: "320 E Main St, Florence, CO 81226",
    phone: "(719) 784-7700",
    website: null,
    hours: "Tue-Sun 10am-5pm",
    featured: false,
    imageUrl: null,
  },

  // --- BREWERIES ---
  {
    name: "Florence Brewing Company",
    slug: "florence-brewing-company",
    category: "breweries",
    shortDescription: "Florence's original craft brewery with handcrafted ales and lagers.",
    description:
      "Florence Brewing Company is the heart of Florence's craft beer scene. Established in a beautifully restored historic building, this neighborhood taproom pours handcrafted ales, lagers, and seasonal specialties. Pair your pint with their rotating food menu and enjoy the warmth of a true Colorado local brewery. Live music weekends.",
    address: "100 E 3rd St, Florence, CO 81226",
    phone: "(719) 784-2337",
    website: "https://florencebrewing.com",
    hours: "Wed-Thu 4-9pm, Fri-Sat 12-10pm, Sun 12-7pm",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Royal Gorge Brewing Co",
    slug: "royal-gorge-brewing-co",
    category: "breweries",
    shortDescription: "Craft beers inspired by the gorge, just minutes away in Canon City.",
    description:
      "A short drive from Florence, Royal Gorge Brewing Co in Canon City offers spectacular craft beers named after local landmarks and the Colorado outdoors. Their taproom features panoramic mountain views and a full kitchen menu.",
    address: "1206 Royal Gorge Blvd, Canon City, CO 81212",
    phone: "(719) 276-1900",
    website: null,
    hours: "Daily 11am-9pm",
    featured: false,
    imageUrl: null,
  },

  // --- RESTAURANTS ---
  {
    name: "Florence Kitchen & Bar",
    slug: "florence-kitchen-bar",
    category: "restaurants",
    shortDescription: "Comfort food and craft cocktails in a relaxed setting.",
    description:
      "Florence Kitchen & Bar serves up hearty Colorado comfort food, house-made soups, and a thoughtful cocktail list in a cozy, unpretentious atmosphere. A local favorite for lunch, dinner, and weekend brunch — the green chile smothered dishes are legendary.",
    address: "210 W Main St, Florence, CO 81226",
    phone: "(719) 784-5100",
    website: null,
    hours: "Tue-Sun 11am-9pm",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Main Street Diner",
    slug: "main-street-diner",
    category: "restaurants",
    shortDescription: "Classic American diner open for breakfast and lunch.",
    description:
      "The Main Street Diner has been feeding Florence families for decades with classic American breakfasts, blue-plate specials, and the best pie in Fremont County. Grab a counter seat and chat with the locals — this is where Florence comes alive in the morning.",
    address: "115 E Main St, Florence, CO 81226",
    phone: "(719) 784-3300",
    website: null,
    hours: "Mon-Sat 6am-2pm, Sun 7am-1pm",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Mi Rancho Mexican Restaurant",
    slug: "mi-rancho-mexican-restaurant",
    category: "restaurants",
    shortDescription: "Authentic Mexican food with house-made tortillas.",
    description:
      "Mi Rancho serves authentic Mexican cuisine made with family recipes brought from Chihuahua. Everything from the tortillas to the tamales is made from scratch daily. The chile verde is slow-cooked for hours and has earned a devoted following throughout Fremont County.",
    address: "350 W Main St, Florence, CO 81226",
    phone: "(719) 784-2800",
    website: null,
    hours: "Tue-Sun 11am-8pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "The Depot Cafe",
    slug: "the-depot-cafe",
    category: "restaurants",
    shortDescription: "Coffee, pastries, and light fare in a historic rail setting.",
    description:
      "Housed in the historic Florence train depot, The Depot Cafe serves specialty coffees, house-baked pastries, sandwiches, and seasonal soups. The perfect stop to fuel up before a day of antiquing or a drive on the Gold Belt Tour.",
    address: "100 Railroad Ave, Florence, CO 81226",
    phone: "(719) 784-9000",
    website: null,
    hours: "Mon-Sat 7am-3pm",
    featured: false,
    imageUrl: null,
  },

  // --- SISTER BUSINESSES (Canon City / Royal Gorge — 15 min from Florence) ---
  {
    name: "WhiteWater Bar & Grill",
    slug: "whitewater-bar-grill",
    category: "restaurants",
    shortDescription: "Riverside dining and live music west of Canon City — 15 min from Florence.",
    description:
      "WhiteWater Bar & Grill is the go-to spot for cold drinks, great food, and live weekend entertainment after a day on the river or at the Royal Gorge. Known for their smoked meats, signature cocktails, and expansive outdoor patio. Located on Hwy 50 west of Canon City, just 15 minutes from Florence.",
    address: "45045 Hwy 50 West, Canon City, CO 81212",
    phone: "(719) 269-1009",
    website: "https://whitewaterbar.com",
    hours: "Apr-Oct, check website for current hours",
    featured: true,
    tier: "sponsored",
    imageUrl: "/images/listings/wwbg-hero.jpg",
  },
  {
    name: "Rooftop Social",
    slug: "rooftop-social",
    category: "restaurants",
    shortDescription: "Rooftop bar and dining with Arkansas River valley views in Canon City.",
    description:
      "Rooftop Social is Canon City's premier rooftop bar and restaurant, offering stunning views of the Arkansas River valley and Sangre de Cristo mountains. Creative cocktails, fresh food, and the best sunset views in the region — just 15 minutes from Florence.",
    address: "302 Royal Gorge Blvd, Canon City, CO 81212",
    phone: "(719) 451-7241",
    website: "https://wwrooftopsocial.com",
    hours: "Wed-Sun 4pm-10pm",
    featured: true,
    tier: "sponsored",
    imageUrl: "/images/listings/rt-hero.jpg",
  },
  {
    name: "Royal Gorge Rafting",
    slug: "royal-gorge-rafting",
    category: "activities",
    shortDescription: "World-class Class III–V whitewater rafting through the Royal Gorge.",
    description:
      "Royal Gorge Rafting offers guided whitewater adventures on the Arkansas River through the dramatic Royal Gorge — 1,000-foot canyon walls, Class III–V rapids, and scenery unlike anywhere in the world. Half-day and full-day trips available. Just 15 minutes from Florence.",
    address: "45000 US-50, Canon City, CO 81212",
    phone: "(719) 275-7238",
    website: "https://royalgorgerafting.net",
    hours: "Daily May-Sept, 8am-6pm",
    featured: true,
    tier: "sponsored",
    imageUrl: "/images/listings/rgr-hero.jpg",
  },
  {
    name: "Royal Gorge Zipline Tours",
    slug: "royal-gorge-zipline-tours",
    category: "activities",
    shortDescription: "Epic zipline adventures over the Royal Gorge canyon.",
    description:
      "Soar over the Royal Gorge on one of Colorado's most thrilling zipline experiences. Royal Gorge Zipline Tours offers classic and extreme courses with breathtaking views of the 1,000-foot canyon walls and the Arkansas River below. Located 15 minutes from Florence.",
    address: "45045 US-50, Canon City, CO 81212",
    phone: "(719) 275-7238",
    website: "https://royalgorgeziplinetours.com",
    hours: "Daily May-Sept, 8am-5pm",
    featured: true,
    tier: "sponsored",
    imageUrl: "/images/listings/rgzt-hero.jpg",
  },
  {
    name: "Royal Gorge Vacation Rentals",
    slug: "royal-gorge-vacation-rentals",
    category: "lodging",
    shortDescription: "Glamping yurts, Airstreams, and riverside cabins near the Royal Gorge.",
    description:
      "Royal Gorge Vacation Rentals offers unique glamping experiences — luxury yurts, vintage Airstreams, and riverside cabins set in a stunning canyon landscape. The perfect base for exploring the Royal Gorge, rafting, and the Florence antique district. Just 15 minutes from Florence.",
    address: "45000 US-50, Canon City, CO 81212",
    phone: "(719) 275-7238",
    website: "https://royalgorgevacationrentals.com",
    hours: "Year-round, check website for availability",
    featured: true,
    tier: "sponsored",
    imageUrl: "/images/listings/rgvr-hero.jpg",
  },
  {
    name: "Royal Gorge Epic Adventures",
    slug: "royal-gorge-epic-adventures",
    category: "activities",
    shortDescription: "The ultimate Royal Gorge adventure hub — rafting, zipline, lodging & more.",
    description:
      "Royal Gorge Epic Adventures is your one-stop destination for world-class adventure in the Royal Gorge region. Offering whitewater rafting, zipline tours, helicopter tours, glamping, and more — all set against the dramatic 1,000-foot canyon walls of the Royal Gorge. Just 15 minutes from Florence.",
    address: "45000 US-50, Canon City, CO 81212",
    phone: "(719) 275-7238",
    website: "https://royalgorgeepicadventures.com",
    hours: "Daily May-Sept, 8am-6pm",
    featured: true,
    tier: "sponsored",
    imageUrl: "/images/listings/rgea-hero.jpg",
  },

  // --- ACTIVITIES ---
  {
    name: "Royal Gorge Bridge & Park",
    slug: "royal-gorge-bridge-park",
    category: "activities",
    shortDescription: "America's highest suspension bridge — just 15 minutes from Florence.",
    description:
      "Just 15 miles from Florence, the Royal Gorge Bridge & Park offers one of Colorado's most breathtaking experiences. Walk across the 956-foot-high suspension bridge spanning the Arkansas River, ride the aerial gondola, explore the park's rides and activities, and take in views of one of the deepest canyons in the American West.",
    address: "4218 County Rd 3A, Canon City, CO 81212",
    phone: "(719) 275-7507",
    website: "https://royalgorgebridge.com",
    hours: "Daily 9am-6pm (seasonal hours vary)",
    featured: true,
    imageUrl: "/images/listings/royal-gorge-canyon.jpg",
  },
  {
    name: "Gold Belt Tour Scenic Byway",
    slug: "gold-belt-tour-scenic-byway",
    category: "activities",
    shortDescription: "100-mile historic loop through mining towns and canyon landscapes.",
    description:
      "The Gold Belt Tour is a National Scenic and Historic Byway that loops through the mountains south and west of Florence, passing through historic mining towns, dramatic canyon landscapes, and fossil beds. The three-route system connects Florence, Canon City, Cripple Creek, and Victor — offering spectacular drives through some of Colorado's most underrated terrain.",
    address: "Florence, CO 81226",
    phone: null,
    website: "https://goldbeltbyway.com",
    hours: "Open year-round (some sections seasonal)",
    featured: true,
    imageUrl: null,
  },
  {
    name: "Dinosaur Depot Museum",
    slug: "dinosaur-depot-museum",
    category: "activities",
    shortDescription: "World-class dinosaur fossils from the Colorado fossil beds.",
    description:
      "The Dinosaur Depot Museum in nearby Canon City showcases fossil discoveries from the Fruita and Garden Park fossil areas, some of the richest dinosaur bone beds in the world. The museum features full-size mounted skeletons, fossil preparation labs you can watch in action, and guided fossil dig experiences.",
    address: "330 Royal Gorge Blvd, Canon City, CO 81212",
    phone: "(719) 269-7150",
    website: "https://dinosaurdepot.com",
    hours: "Mon-Sat 9am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Arkansas River Recreation",
    slug: "arkansas-river-recreation",
    category: "activities",
    shortDescription: "World-class rafting, kayaking, and fly fishing on the Arkansas.",
    description:
      "The Arkansas River flows just minutes from Florence and offers some of the best whitewater rafting in North America. The Royal Gorge section features Class III-V rapids, while the Bighorn Sheep Canyon section is perfect for families and beginners. Fly fishing on the Arkansas is legendary — designated Gold Medal water stretches are among the best trout fisheries in Colorado.",
    address: "Florence, CO 81226",
    phone: null,
    website: null,
    hours: "Year-round (rafting season April-September)",
    featured: false,
    imageUrl: "/images/listings/rgr-rafting.jpg",
  },
  {
    name: "Florence Historic Downtown Walking Tour",
    slug: "florence-historic-downtown-walking-tour",
    category: "activities",
    shortDescription: "Self-guided tour of Florence's Victorian-era architecture.",
    description:
      "Download the free self-guided walking tour map and explore Florence's remarkably intact Victorian-era commercial district. The tour covers Main Street's 1880s storefronts, the historic oil derrick, the Carnegie library, and the early 20th-century residential neighborhoods — a living museum of Colorado's frontier and oil boom eras.",
    address: "Florence City Hall, 600 W 3rd St, Florence, CO 81226",
    phone: "(719) 784-4848",
    website: null,
    hours: "Self-guided, available anytime",
    featured: false,
    imageUrl: null,
  },

  // --- ART ---
  {
    name: "Fremont Arts Council Gallery",
    slug: "fremont-arts-council-gallery",
    category: "art",
    shortDescription: "Rotating exhibits of regional Colorado artists.",
    description:
      "The Fremont Arts Council Gallery showcases the work of artists from across southern Colorado, with rotating monthly exhibits featuring painting, sculpture, photography, and mixed media. Their gift shop offers affordable original art and prints — perfect mementos of your Florence visit.",
    address: "230 Main St, Florence, CO 81226",
    phone: "(719) 784-1234",
    website: null,
    hours: "Tue-Sat 11am-5pm",
    featured: false,
    imageUrl: null,
  },
  {
    name: "Adobe House Gallery",
    slug: "adobe-house-gallery",
    category: "art",
    shortDescription: "Southwestern and Western art in a historic adobe building.",
    description:
      "Housed in one of Florence's oldest adobe structures, Adobe House Gallery specializes in Southwestern-inspired paintings, bronze sculptures, and handcrafted pottery. The gallery itself is a work of art — thick adobe walls, vigas, and a courtyard garden make every visit memorable.",
    address: "415 E Main St, Florence, CO 81226",
    phone: "(719) 784-8800",
    website: null,
    hours: "Fri-Sun 11am-5pm",
    featured: false,
    imageUrl: null,
  },
];

const eventsData: schema.NewEvent[] = [
  {
    title: "Florence Antique & Art Festival",
    description:
      "The biggest antique event of the year brings hundreds of dealers to downtown Florence for a two-day festival spanning all of Main Street. Shop rare finds, meet dealers, enjoy live music, and taste local food and craft beer. Free admission.",
    date: new Date("2026-08-15T09:00:00"),
    endDate: new Date("2026-08-16T18:00:00"),
    location: "Main Street, Florence, CO",
    category: "festival",
    url: null,
  },
  {
    title: "Gold Belt Tour Drive Weekend",
    description:
      "Join guided caravan drives along the three routes of the Gold Belt Tour Scenic Byway. Expert guides share history at every stop, including the historic mines, fossils beds, and views of the Royal Gorge. Registration required.",
    date: new Date("2026-09-20T08:00:00"),
    endDate: new Date("2026-09-20T17:00:00"),
    location: "Florence City Park, Florence, CO",
    category: "outdoors",
    url: null,
  },
  {
    title: "Florence Harvest Festival",
    description:
      "Celebrate fall in the Antique Capital with a community harvest festival featuring local produce, arts and crafts, antique auctions, live bluegrass music, and activities for all ages. A beloved Florence tradition.",
    date: new Date("2026-10-10T10:00:00"),
    endDate: new Date("2026-10-10T17:00:00"),
    location: "Florence City Park, Florence, CO",
    category: "festival",
    url: null,
  },
  {
    title: "Florence Brewing Oktoberfest",
    description:
      "Florence Brewing Company hosts its annual Oktoberfest with seasonal German-style beers, live oompah band, and authentic food. Limited edition steins available. Family and dog friendly.",
    date: new Date("2026-09-27T12:00:00"),
    endDate: new Date("2026-09-27T21:00:00"),
    location: "Florence Brewing Company, 100 E 3rd St",
    category: "brewery",
    url: null,
  },
  {
    title: "First Friday Art Walk",
    description:
      "Florence galleries and antique shops open late on the first Friday of each month for an evening art walk. Meet local artists, enjoy refreshments, and discover new work across downtown Florence.",
    date: new Date("2026-07-03T17:00:00"),
    endDate: new Date("2026-07-03T20:00:00"),
    location: "Downtown Florence, Main Street",
    category: "art",
    url: null,
  },
  {
    title: "Arkansas River Cleanup & Fish Festival",
    description:
      "Join volunteers for the annual river cleanup along the Arkansas near Florence, followed by a community fish fry, fly fishing demonstrations, and presentations by Colorado Parks & Wildlife on the Gold Medal fishery.",
    date: new Date("2026-06-06T08:00:00"),
    endDate: new Date("2026-06-06T15:00:00"),
    location: "Portland Trail Head, Florence, CO",
    category: "outdoors",
    url: null,
  },
];

async function main() {
  console.log("Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("Trace87223!", 12);
  await db
    .insert(schema.admins)
    .values({
      email: "CEO@epicai.ai",
      hashedPassword,
      name: "Trace Hildebrand",
    })
    .onConflictDoNothing();

  console.log("Admin seeded.");

  // Listings
  for (const listing of listingsData) {
    await db.insert(schema.listings).values(listing).onConflictDoNothing();
  }
  console.log(`Seeded ${listingsData.length} listings.`);

  // Events
  for (const event of eventsData) {
    await db.insert(schema.events).values(event).onConflictDoNothing();
  }
  console.log(`Seeded ${eventsData.length} events.`);

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
