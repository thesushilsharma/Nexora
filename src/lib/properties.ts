import { mockProperties } from "../../public/mock-property";
import { Property, PropertyFilter } from "./schema";

export async function getSearchProperties(filter?: PropertyFilter): Promise<Property[]> {
    try {
        let filteredProperties: Property[] = [...mockProperties]; // Start with all mock properties

        if (filter?.search) {
            const searchTerm = filter.search.toLowerCase(); // Normalize the search term
            filteredProperties = filteredProperties.filter(
                (property) =>
                    property.title.toLowerCase().includes(searchTerm) ||
                    property.address.toLowerCase().includes(searchTerm)
            );
        }

        return filteredProperties;
    } catch (error) {
        console.error('Error fetching properties:', error);
        return []; // Return an empty array in case of an error
    }
}