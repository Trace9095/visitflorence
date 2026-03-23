/**
 * One-time script to fix sister business contact info and add missing partners.
 * Run: npm run db:fix-contacts
 * (or: dotenv -e .env.local -- tsx lib/db/fix-sister-contacts.ts)
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log("Fixing sister business contact info...");

  // Fix WWBG — correct address and phone
  await db
    .update(schema.listings)
    .set({
      address: "45045 Hwy 50 West, Canon City, CO 81212",
      phone: "(719) 269-1009",
      shortDescription: "Riverside dining and live music west of Canon City — 15 min from Florence.",
    })
    .where(eq(schema.listings.slug, "whitewater-bar-grill"));
  console.log("Fixed: WhiteWater Bar & Grill");

  // Fix RT — correct phone
  await db
    .update(schema.listings)
    .set({ phone: "(719) 451-7241" })
    .where(eq(schema.listings.slug, "rooftop-social"));
  console.log("Fixed: Rooftop Social");

  // Fix RGZT — correct phone (was 275-7507, should be 275-7238)
  await db
    .update(schema.listings)
    .set({ phone: "(719) 275-7238" })
    .where(eq(schema.listings.slug, "royal-gorge-zipline-tours"));
  console.log("Fixed: Royal Gorge Zipline Tours");

  // Add RGVR if not already present
  await db
    .insert(schema.listings)
    .values({
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
    })
    .onConflictDoNothing();
  console.log("Added: Royal Gorge Vacation Rentals");

  // Add RGEA if not already present
  await db
    .insert(schema.listings)
    .values({
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
    })
    .onConflictDoNothing();
  console.log("Added: Royal Gorge Epic Adventures");

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
