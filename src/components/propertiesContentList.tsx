'use client';

import { useQuery } from '@tanstack/react-query';
import { PropertyCard } from '@/components/property-card';
import { PropertyFilters } from '@/components/property-filters';
import { PropertySort } from '@/components/property-sort';
import { parseAsFloat, parseAsInteger, useQueryState } from 'nuqs';
import { propertyFilterSchema, Property, PropertyFilter } from '@/lib/schema';

export function PropertiesClientContent() {
    // Use Nugs to manage query parameters
    const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsFloat);
    const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsFloat);
    const [bedrooms, setBedrooms] = useQueryState('bedrooms', parseAsInteger);
    const [sortByRaw, setSortBy] = useQueryState('sortBy', {});

    // Validate sortBy using Zod to ensure it matches the enum type
    const sortByValidation = propertyFilterSchema.shape.sortBy.safeParse(sortByRaw);
    const sortBy = sortByValidation.success ? sortByValidation.data : undefined;

    // Construct filters object dynamically
    const filters: PropertyFilter = {
        minPrice: minPrice ?? undefined,
        maxPrice: maxPrice ?? undefined,
        bedrooms: bedrooms !== null && bedrooms !== 0 ? bedrooms : undefined, // Ignore if 0
        sortBy,
    };

    // Fetch properties using React Query
    const {
        data: properties = [],
        isLoading,
        isError,
        error,
    } = useQuery<Property[], Error>({
        queryKey: ['/api/properties', filters],
        queryFn: async ({ queryKey }) => {
            const [, filters] = queryKey as [string, PropertyFilter];
            const params = new URLSearchParams();

            if (filters.minPrice !== undefined)
                params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice !== undefined)
                params.append('maxPrice', filters.maxPrice.toString());
            if (filters.bedrooms !== undefined)
                params.append('bedrooms', filters.bedrooms.toString());
            if (filters.sortBy !== undefined) params.append('sortBy', filters.sortBy);

            const res = await fetch(`/api/properties?${params.toString()}`);
            const data = await res.json();

            if (Array.isArray(data)) {
                return data;
            } else if (data && Array.isArray(data.data)) {
                return data.data;
            } else {
                throw new Error('Invalid API response');
            }
        },
        staleTime: 60000, // Cache for 60 seconds
        refetchInterval: 15000, // Auto-refetch every 15 seconds
        refetchOnWindowFocus: true, // Refetch when user focuses on the page
        retry: 1, // Retry once on failure
    });

    // Handle filter changes
    const handleFilterChange = (name: string, value: string | number | undefined) => {
        switch (name) {
            case 'minPrice':
                setMinPrice(value === undefined ? null : (value as number));
                break;
            case 'maxPrice':
                setMaxPrice(value === undefined ? null : (value as number));
                break;
            case 'bedrooms':
                setBedrooms(value === undefined ? null : (value as number));
                break;
            case 'sortBy':
                setSortBy(value as string); // Ensure valid values are passed here
                break;
            default:
                break;
        }
    };

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {/* Property Filters */}
            <PropertyFilters
                minPrice={minPrice?.toString() || ''}
                maxPrice={maxPrice?.toString() || ''}
                bedrooms={bedrooms?.toString() || ''}
                onFilterChange={handleFilterChange}
            />

            {/* Property Sort */}
            <div className="flex justify-end mb-6">
                <PropertySort
                    value={sortBy || ''}
                    onChange={(value) => handleFilterChange('sortBy', value)}
                />
            </div>

            {/* Property List */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties?.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </>
    );
}