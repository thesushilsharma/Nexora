import { z } from 'zod';

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
    sortBy: z.enum(['price-asc', 'price-desc', 'newest', 'alpha']).optional(),
    search: z.string().optional(), 
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type PropertyFilter = z.infer<typeof propertyFilterSchema>;

export type Property = InsertProperty & {
    id: number;
    createdAt: Date;
};

