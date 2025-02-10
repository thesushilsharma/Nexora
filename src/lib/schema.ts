import { z } from "zod";

export const insertPropertySchema = z.object({
  title: z.string(),
  address: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  size: z.number(),
  image: z.string(),
});

export const propertyFilterSchema = z.object({
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  bedrooms: z.number().optional(),
  sortBy: z.enum(["price-asc", "price-desc", "newest", "alpha"]).optional(),
  search: z.string().optional(),
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type PropertyFilter = z.infer<typeof propertyFilterSchema>;

export type Property = InsertProperty & {
  id: number;
  createdAt: Date;
};

export const PropertySchema = z.object({
  propertyTitle: z.string().min(1, { message: "Property title is required" }),
  propertyDescription: z
    .string()
    .min(1, { message: "Property description is required" }),
  fundingStatus: z.enum([
    "available", // Funding is actively being sought.
    "funded",    // Project has secured funding.
    "exited",    // Project has been successfully completed and the investment returned.
    "paused",    // Funding efforts are temporarily on hold.  // Added
    "cancelled", // Project funding was cancelled.      // Added
  ]),
  category: z.enum([
    "renovation", // Property is currently undergoing renovation.
    "rented",      // Property is currently rented out.
    "ready",       // Property is ready for sale or rent.
    "sold",        // Property has been sold.
    "new",         // Newly listed property.        // Added
    "pre_construction", // Property is in the pre-construction phase. // Added
  ]),
  publishStatus: z.enum([
    "saved",     // Draft saved but not yet published.
    "published", // Property listing is live.
    "pending",   // Listing is awaiting approval.  // Added
    "rejected",  // Listing was rejected.         // Added
    "archived", // Listing is no longer active and has been archived. // Added
  ]),
  propertyType: z.enum([
    "apartment", // An apartment.
    "villa",     // A villa.
    "townhouse", // A townhouse.          // Added
    "condominium", // A condominium.      // Added
    "commercial", // A commercial property. // Added
    "land", // A plot of land. // Added
    "other", // Other property type.     // Added
  ]),
  boughtDate: z.string().nullable(),
  soldDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().nullable()
  ),
  totalValue: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(0)
  ),
  fractionalUnitPrice: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(0)
  ),
  currentRent: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(0)
  ),
  completionDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().nullable()
  ),
  bedrooms: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().int().min(1)
  ),
  bathrooms: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().int().min(1)
  ),
  propertySize: z.preprocess(
    (val) => (val === null ? null : Number(val)),
    z.number().nullable()
  ),
  location: z.string().min(1, { message: "Location is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  latitude: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(-90).max(90)
  ),
  longitude: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(-180).max(180)
  ),
  fundingStartDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().nullable()
  ),
  fundingEndDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().nullable()
  ),
  amenities: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",") : val),
    z.array(z.string())
  ),
  images: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z.array(z.string())
  ),
  videos: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z.array(z.string())
  ),
});

export type PropertyList = z.infer<typeof PropertySchema>;
