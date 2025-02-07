import { SearchForm } from '@/components/search-form'
import React from 'react'
import { PropertyCard } from '@/components/property-card'
import { Property } from '@/lib/schema';
import { getSearchProperties } from '@/lib/properties';

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {
    const { query } = await searchParams; // Extract and normalize the query
    //console.log('query:', query);

    // Filter properties based on search query (location or name)
    const filteredProperties: Property[] = await getSearchProperties({ search: query });
    // console.log('filteredProperties:', filteredProperties)

    return (
        <div>
            <SearchForm />
            <h1 className="text-4xl font-bold mb-8">Search Properties</h1>
            {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
                    ))}
                </div>
            )}
        </div>
    )
}

