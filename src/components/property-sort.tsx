import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertySortProps {
  value: string;
  onChange: (value: string) => void;
}

export function PropertySort({ value, onChange }: PropertySortProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="alpha">Alphabetical</SelectItem>
      </SelectContent>
    </Select>
  );
}
