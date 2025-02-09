import { PropertiesClientContent } from "@/components/propertiesContentList";
import { ThemeToggleMode } from "@/components/theme-mode-toggle";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function PropertiesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <ThemeToggleMode/>
            <h1 className="text-4xl font-bold mb-8">Featured Properties</h1>
            <Suspense fallback={
                <div>
                    <Loader2 className="animate-spin" />
                </div>}>
                <PropertiesClientContent />
            </Suspense>
        </div>
    );
}