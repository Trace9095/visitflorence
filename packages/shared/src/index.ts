export type Category =
  | "antiques"
  | "breweries"
  | "restaurants"
  | "activities"
  | "art"
  | "lodging"
  | "services";

export interface Listing {
  id: number;
  name: string;
  slug: string;
  category: Category;
  description: string;
  shortDescription: string;
  address: string;
  phone: string | null;
  website: string | null;
  hours: string | null;
  imageUrl: string | null;
  featured: boolean;
  createdAt: Date;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  endDate: Date | null;
  location: string;
  category: string;
  url: string | null;
  createdAt: Date;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  antiques: "Antique Shops",
  breweries: "Breweries & Bars",
  restaurants: "Restaurants",
  activities: "Activities",
  art: "Art Galleries",
  lodging: "Lodging",
  services: "Services",
};

export const SITE_NAME = "Visit Florence, CO";
export const SITE_URL = "https://visitflorence.co";
export const SITE_DESCRIPTION =
  "Discover Florence, Colorado — the Antique Capital of Colorado. Explore 100+ antique shops, craft breweries, local dining, and outdoor adventures just minutes from the Royal Gorge.";
