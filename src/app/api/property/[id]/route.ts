import { NextRequest, NextResponse } from "next/server";
import { mockProperties } from "../../../../../public/mock-property";
import { Property } from "@/lib/schema";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const propertyId = parseInt(id, 10);

    //console.log("id", propertyId);

    if (isNaN(propertyId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const property = await getProperty(propertyId);
    // console.log("property", property);
    if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property);
}

async function getProperty(id: number): Promise<Property | undefined> {
    return mockProperties.find((p) => p.id === id);
}
