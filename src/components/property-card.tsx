import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Home, Ruler, BedDouble } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/schema";

interface PropertyCardProps {
    property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    return (
        <Link href={`/properties/${property.id}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/50 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="aspect-[16/9] overflow-hidden relative">
                    <Image
                        src={property.image}
                        alt={property.title}
                        width={500} // Adjust dimensions as needed
                        height={300} // Adjust dimensions as needed
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        priority // Use for above-the-fold images to improve LCP
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{property.title}</h3>
                    <p className="text-muted-foreground mb-4">{property.address}</p>
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary/60 mb-4">
                        {formatter.format(property.price)}
                    </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex gap-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4" />
                        <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        <span>{property.size.toLocaleString()} sqft</span>
                    </div>
                </CardFooter>
            </Card>
        </Link >
    );
}
