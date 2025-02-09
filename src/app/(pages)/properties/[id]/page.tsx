"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import {
    Home,
    Ruler,
    BedDouble,
    Calendar,
    MapPin,
    Camera,
    Video,
} from "lucide-react";
import { DateTime } from "luxon";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { Property } from "@/lib/schema";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Glow, GlowArea } from "@/components/glow-effect";
import { ThemeToggleMode } from "@/components/theme-mode-toggle";

export default function PropertyDetailPage() {
    const { id } = useParams();
    const [mainRef] = useEmblaCarousel({ loop: true });
    const [thumbsRef] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
    const {
        data: property,
        isLoading,
        isError,
        error,
    } = useQuery<Property>({
        queryKey: [`/api/property/${id}`],
        queryFn: async () => {
            const response = await fetch(`/api/property/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 ">
                <Skeleton className="h-[600px] w-full mb-8 rounded-2xl bg-muted" />
                <div className="flex gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-24 w-24 rounded-lg flex-shrink-0 bg-muted"
                        />
                    ))}
                </div>
                <Skeleton className="h-8 w-64 mb-4 bg-muted" />
                <Skeleton className="h-6 w-full max-w-2xl mb-8 bg-muted" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="h-40 rounded-xl bg-muted" />
                    <Skeleton className="h-40 rounded-xl bg-muted" />
                </div>
            </div>
        );
    }

    if (!property) {
        return <div>Property not found</div>;
    }

    if (isError) {
        return <div>Error fetching property details: {error?.message}</div>;
    }

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    const images = [
        property.image,
        property.image.replace(/\d+(?=\?)/, "1"),
        property.image.replace(/\d+(?=\?)/, "2"),
        property.image.replace(/\d+(?=\?)/, "3"),
        property.image.replace(/\d+(?=\?)/, "4"),
    ];

    const detailItems = [
        {
            icon: <BedDouble className="h-5 w-5" />,
            label: "Bedrooms",
            value: property.bedrooms,
            suffix: "Bedrooms",
        },
        {
            icon: <Ruler className="h-5 w-5" />,
            label: "Size",
            value: property.size.toLocaleString(),
            suffix: "Square Feet",
        },
        {
            icon: <Calendar className="h-5 w-5" />,
            label: "Listed Date",
            value: property.createdAt
                ? DateTime.fromISO(
                    property.createdAt instanceof Date
                        ? property.createdAt.toISOString()
                        : property.createdAt
                ).toFormat("MMMM d, yyyy")
                : "Unknown date",
        },
    ];

    return (
        <div className="min-h-screen bg-background/50 pb-12">
             <ThemeToggleMode/>
            <div className="bg-gradient-to-b from-background to-background/5">
                {/* Main Image Slider with Autoplay */}
                <Carousel
                    plugins={[plugin.current]}
                    className="embla relative overflow-hidden"
                    ref={mainRef}
                >
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="aspect-[16/9] md:aspect-[21/9] flex justify-center items-center">
                                    <div className="w-full max-w-4xl mx-auto shadow-destructive-sm rounded-lg overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={`${property.title} - View ${index + 1}`}
                                            width={1920}
                                            height={1080}
                                            className="w-full h-full object-cover rounded-lg transition-shadow duration-300"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="flex sm:flex-row items-center justify-center sm:justify-end gap-2 py-4 z-20">
                    <Button
                        size="sm"
                        className="backdrop-blur-md border bg-muted shadow-lg hover:bg-accent transition-all"
                    >
                        <Camera className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="hidden sm:inline text-foreground hover:text-background">
                            {images.length} Photos
                        </span>
                        <span className="sm:hidden">{images.length}</span>
                    </Button>
                    <Button
                        size="sm"
                        className="backdrop-blur-md border bg-muted shadow-lg hover:bg-accent transition-all"
                    >
                        <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="hidden sm:inline text-foreground hover:text-background">
                            Virtual Tour
                        </span>
                        <span className="sm:hidden">Tour</span>
                    </Button>
                </div>

                {/* Thumbnail Slider */}
                <div
                    className="embla embla-thumbs overflow-hidden mt-0 sm:-mt-20 relative z-20 container mx-auto px-4"
                    ref={thumbsRef}
                >
                    <div className="embla__container flex gap-6 pb-4">
                        {images.map((image, index) => (
                            <div key={index} className="embla__slide flex-[0_0_auto]">
                                <button
                                    type="button"
                                    className="relative block h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden ring-2 ring-background/80 hover:ring-primary/60 transition-all duration-200 shadow-lg"
                                >
                                    <Image
                                        src={image}
                                        alt={`${property.title} thumbnail ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-background/10 backdrop-blur-sm hover:bg-transparent transition-colors duration-300" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property Details Section */}
                <div className="container mx-auto px-4 mt-8">
                    <Card className="backdrop-blur-xl bg-background/60 border-border/50 rounded-2xl overflow-hidden hover:shadow-dual-muted">
                        <CardContent className="p-8">
                            <div className="mb-8">
                                <div className="flex items-center gap-2">
                                    <Home className="h-4 w-4 text-muted-foreground" />
                                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2 py-3">
                                        {property.title}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <p className="text-lg">{property.address}</p>
                                </div>
                                <div className="mt-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary/60">
                                    {formatter.format(property.price)}
                                </div>
                            </div>

                            <GlowArea size={400} className="w-full">
                                {" "}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {" "}
                                    <Glow className="rounded-xl group">
                                        {" "}
                                        <Card className="h-full bg-card/50 backdrop-blur border-border/50 transition-all duration-300 hover:scale-[1.02]">
                                            {" "}
                                            <CardContent className="p-6">
                                                {" "}
                                                <div className="flex items-center gap-3 mb-6">
                                                    {" "}
                                                    <Home className="h-6 w-6 text-primary" />{" "}
                                                    <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                                        {" "}
                                                        Property Details{" "}
                                                    </h2>{" "}
                                                </div>{" "}
                                                <div className="space-y-5">
                                                    {" "}
                                                    {detailItems.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-4 text-muted-foreground group-hover:text-primary/90 transition-all duration-300 hover:translate-x-1"
                                                        >
                                                            {" "}
                                                            <div className="flex-shrink-0 p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                                                                {" "}
                                                                {item.icon}{" "}
                                                            </div>{" "}
                                                            <div className="flex flex-col">
                                                                {" "}
                                                                <span className="text-medium text-muted-foreground/70">
                                                                    {" "}
                                                                    {item.label}{" "}
                                                                </span>{" "}
                                                                <span className="text-lg font-medium">
                                                                    {" "}
                                                                    {item.value} {item.suffix}{" "}
                                                                </span>{" "}
                                                            </div>{" "}
                                                        </div>
                                                    ))}{" "}
                                                </div>{" "}
                                            </CardContent>{" "}
                                        </Card>{" "}
                                    </Glow>{" "}
                                    <Glow className="rounded-xl group">
                                        {" "}
                                        <Card className="h-full bg-card/50 backdrop-blur border-border/50 transition-all duration-300 hover:scale-[1.02]">
                                            {" "}
                                            <CardContent className="p-6">
                                                {" "}
                                                <div className="flex items-center gap-3 mb-6">
                                                    {" "}
                                                    <MapPin className="h-6 w-6 text-primary" />{" "}
                                                    <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                                        {" "}
                                                        Location{" "}
                                                    </h2>{" "}
                                                </div>{" "}
                                                <div className="flex items-start gap-4 text-muted-foreground group-hover:text-primary/90 transition-all duration-300 hover:translate-x-1">
                                                    {" "}
                                                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                                                        {" "}
                                                        <MapPin className="h-5 w-5" />{" "}
                                                    </div>{" "}
                                                    <div className="flex flex-col">
                                                        {" "}
                                                        <span className="text-medium text-muted-foreground/70">
                                                            Address
                                                        </span>{" "}
                                                        <p className="text-lg font-medium">
                                                            {property.address}
                                                        </p>{" "}
                                                    </div>{" "}
                                                </div>{" "}
                                            </CardContent>{" "}
                                        </Card>{" "}
                                    </Glow>{" "}
                                </div>{" "}
                            </GlowArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Global Styles for Premium Listing */}
                <style jsx global>{`
          .embla {
            --glass-bg: rgba(255, 255, 255, 0.08);
            --glass-border: rgba(255, 255, 255, 0.12);
            --glass-shadow: rgba(0, 0, 0, 0.1);
          }
          .bg-glass {
            background: var(--glass-bg);
          }
          .border-glass {
            border: 1px solid var(--glass-border);
          }
          .shadow-glass {
            box-shadow: 0px 10px 30px var(--glass-shadow);
          }
        `}</style>
            </div>

        </div>
    );
}
