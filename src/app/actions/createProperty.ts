"use server";

import { PropertyList, PropertySchema } from "@/lib/schema";
import { uploadToSpaces } from "@/lib/uploadToSpaces";

export async function createProperty(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    try {
        const rawData: PropertyList = {
            propertyTitle: formData.get("propertyTitle")?.toString() || "",
            propertyDescription:
                formData.get("propertyDescription")?.toString() || "",
            fundingStatus:
                (formData.get("fundingStatus")?.toString() as
                    | "available"
                    | "funded"
                    | "exited") || "available",
            category:
                (formData.get("category")?.toString() as
                    | "renovation"
                    | "rented"
                    | "ready"
                    | "sold") || "ready",
            publishStatus:
                (formData.get("publishStatus")?.toString() as "saved" | "published") ||
                "saved",
            propertyType:
                (formData.get("propertyType")?.toString() as "apartment" | "villa") ||
                "apartment",
            boughtDate: formData.get("boughtDate")?.toString() || null,
            soldDate: formData.get("soldDate")
                ? new Date(formData.get("soldDate")!.toString())
                : null,
            totalValue: parseFloat(formData.get("totalValue")?.toString() || "0"),
            fractionalUnitPrice: parseFloat(
                formData.get("fractionalUnitPrice")?.toString() || "0"
            ),
            currentRent: parseFloat(formData.get("currentRent")?.toString() || "0"),
            completionDate: formData.get("completionDate")
                ? new Date(formData.get("completionDate")!.toString())
                : null,
            bedrooms: parseInt(formData.get("bedrooms")?.toString() || "1", 10),
            bathrooms: parseInt(formData.get("bathrooms")?.toString() || "1", 10),
            propertySize: formData.get("propertySize")
                ? parseFloat(formData.get("propertySize")!.toString())
                : null,
            location: formData.get("location")?.toString() || "",
            address: formData.get("address")?.toString() || "",
            city: formData.get("city")?.toString() || "",
            country: formData.get("country")?.toString() || "",
            latitude: parseFloat(formData.get("latitude")?.toString() || "0"),
            longitude: parseFloat(formData.get("longitude")?.toString() || "0"),
            fundingStartDate: formData.get("fundingStartDate")
                ? new Date(formData.get("fundingStartDate")!.toString())
                : null,
            fundingEndDate: formData.get("fundingEndDate")
                ? new Date(formData.get("fundingEndDate")!.toString())
                : null,
            amenities: formData.getAll("amenities").map((val) => val.toString()),
            images: formData.getAll("images").map((val) => val.toString()),
            videos: formData.getAll("videos").map((val) => val.toString()),
        };

        const validatedFields = PropertySchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.flatten().fieldErrors as {
                    [K in keyof PropertyList]?: string[];
                },
                inputs: rawData,
            };
        }

        const data = validatedFields.data;

        // Handle file uploads
        const imagePromises = (formData.getAll("images") as File[]).map((file) =>
            uploadToSpaces(file, "property-images")
        );
        const videoPromises = (formData.getAll("videos") as File[]).map((file) =>
            uploadToSpaces(file, "property-videos")
        );

        const [imageUrls, videoUrls] = await Promise.all([
            Promise.all(imagePromises),
            Promise.all(videoPromises),
        ]);

        // Update the data with file URLs
        data.images = imageUrls;
        data.videos = videoUrls;

        return {
            success: true,
            message: "Property created successfully!",
        };
    } catch (error) {
        console.error("Error submitting property form:", error);
        return {
            success: false,
            message: "An error occurred while submitting the form.",
        };
    }
}
