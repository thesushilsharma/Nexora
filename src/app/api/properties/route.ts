import { NextResponse, type NextRequest } from "next/server";
import { mockProperties } from "../../../../public/mock-property";
import { Property, PropertyFilter } from "@/lib/schema";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
      //  console.log("searchParams", searchParams);

        const filter: PropertyFilter = {
            minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
            maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
            bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined,
            sortBy: searchParams.get("sortBy") as PropertyFilter["sortBy"] | undefined,
        };

        const properties = await getProperties(filter);

        return NextResponse.json(properties);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Invalid filter parameters" }, { status: 400 });
    }
}

async function getProperties(filter?: PropertyFilter): Promise<Property[]> {
    let filteredProperties: Property[] = [...mockProperties]; // Ensure the array is properly typed

    if (filter) {
        if (filter.minPrice !== undefined) {
            filteredProperties = filteredProperties.filter(p => p.price >= filter.minPrice!);
        }
        if (filter.maxPrice !== undefined) {
            filteredProperties = filteredProperties.filter(p => p.price <= filter.maxPrice!);
        }

        if (filter.bedrooms !== undefined && filter.bedrooms !== 0) {
            filteredProperties = filteredProperties.filter(p => p.bedrooms === filter.bedrooms);
        }
        // Apply sorting
        switch (filter.sortBy) {
            case "price-asc":
                filteredProperties.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filteredProperties.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                filteredProperties.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
                break;
            case "alpha":
                filteredProperties.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
    }

    return filteredProperties;
}

