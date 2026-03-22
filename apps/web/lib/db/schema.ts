import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", [
  "antiques",
  "breweries",
  "restaurants",
  "activities",
  "art",
  "lodging",
  "services",
]);

export const tierEnum = pgEnum("tier", ["free", "premium", "sponsored"]);

export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: categoryEnum("category").notNull(),
  description: text("description").notNull(),
  shortDescription: varchar("short_description", { length: 300 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  website: varchar("website", { length: 500 }),
  hours: text("hours"),
  imageUrl: varchar("image_url", { length: 500 }),
  gallery: json("gallery").$type<string[]>().default([]),
  featured: boolean("featured").notNull().default(false),
  tier: tierEnum("tier").notNull().default("free"),
  claimedByEmail: varchar("claimed_by_email", { length: 255 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  bookingUrl: varchar("booking_url", { length: 500 }),
  menuUrl: varchar("menu_url", { length: 500 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date"),
  location: varchar("location", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }).notNull().default("general"),
  url: varchar("url", { length: 500 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const claimRequests = pgTable("claim_requests", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull().references(() => listings.id),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Admin = typeof admins.$inferSelect;
export type ClaimRequest = typeof claimRequests.$inferSelect;
