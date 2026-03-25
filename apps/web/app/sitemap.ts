import { MetadataRoute } from "next";
import { getDb } from "@/lib/db";
import { listings } from "@/lib/db/schema";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://visitflorence.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = getDb();

  const allListings = await db.select({ slug: listings.slug, category: listings.category }).from(listings);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/antiques`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/breweries`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/restaurants`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/activities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/add-listing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/request-listing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/manage`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ];

  const listingRoutes: MetadataRoute.Sitemap = allListings.map((l) => ({
    url: `${BASE_URL}/${l.category}/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...listingRoutes];
}
