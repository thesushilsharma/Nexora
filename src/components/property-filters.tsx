import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFiltersProps {
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  onFilterChange: (name: string, value: string) => void;
}

export function PropertyFilters({
  minPrice,
  maxPrice,
  bedrooms,
  onFilterChange,
}: PropertyFiltersProps) {
  return (
    <Card className="mb-6 p-4 rounded-lg animate-pulse-shadow">
      <CardContent className="p-4 grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="No minimum"
            value={minPrice}
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="No maximum"
            value={maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select
            value={bedrooms}
            onValueChange={(value) => onFilterChange("bedrooms", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "bedroom" : "bedrooms"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
