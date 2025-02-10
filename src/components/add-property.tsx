"use client";

import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { useActionState } from "react";
import { useDropzone } from "react-dropzone";
import { createProperty } from "@/app/actions/createProperty";
import { PropertySchema } from "@/lib/schema";
import Image from "next/image";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { AMENITIES_LIST } from "@/lib/constants";

const initialState: ActionResponse = {
  success: false,
  errors: {},
};

export default function PropertyForm() {
  const [state, formAction, isPending] = useActionState(
    createProperty,
    initialState
  );
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  const handleSubmit = async (formData: FormData) => {
    // Add images and videos to formData
    images.forEach((file, index) => {
      formData.append(`images`, file);
    });
    videos.forEach((file, index) => {
      formData.append(`videos`, file);
    });

    const validationResult = PropertySchema.safeParse(
      Object.fromEntries(formData)
    );
    console.log("validationResult:", validationResult);

    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    formAction(formData);
  };

  const onImageDrop = useCallback((acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    setVideos((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: onImageDrop,
    });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      accept: { "video/*": [] },
      onDrop: onVideoDrop,
    });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Property</CardTitle>
        <CardDescription>
          Fill in the details of the new property listing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyTitle">Property Title</Label>
              <Input id="propertyTitle" name="propertyTitle" required />
              {errors.propertyTitle && (
                <p className="text-red-500 text-xs">
                  {errors.propertyTitle[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select name="propertyType" defaultValue="apartment">
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
              {errors.propertyType && (
                <p className="text-red-500 text-xs">{errors.propertyType[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyDescription">Property Description</Label>
            <Textarea
              id="propertyDescription"
              name="propertyDescription"
              required
            />
            {errors.propertyDescription && (
              <p className="text-red-500 text-xs">
                {errors.propertyDescription[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                type="number"
                id="bedrooms"
                name="bedrooms"
                required
                min="1"
              />
              {errors.bedrooms && (
                <p className="text-red-500 text-xs">{errors.bedrooms[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                type="number"
                id="bathrooms"
                name="bathrooms"
                required
                min="1"
              />
              {errors.bathrooms && (
                <p className="text-red-500 text-xs">{errors.bathrooms[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertySize">Property Size (sq ft)</Label>
              <Input
                type="number"
                id="propertySize"
                name="propertySize"
                min="0"
              />
              {errors.propertySize && (
                <p className="text-red-500 text-xs">{errors.propertySize[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalValue">Total Value</Label>
              <Input
                type="number"
                id="totalValue"
                name="totalValue"
                required
                min="0"
              />
              {errors.totalValue && (
                <p className="text-red-500 text-xs">{errors.totalValue[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fractionalUnitPrice">Fractional Unit Price</Label>
              <Input
                type="number"
                id="fractionalUnitPrice"
                name="fractionalUnitPrice"
                required
                min="0"
              />
              {errors.fractionalUnitPrice && (
                <p className="text-red-500 text-xs">
                  {errors.fractionalUnitPrice[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fundingStatus">Funding Status</Label>
              <Select name="fundingStatus" defaultValue="available">
                <SelectTrigger>
                  <SelectValue placeholder="Select funding status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="funded">Funded</SelectItem>
                  <SelectItem value="exited">Exited</SelectItem>
                </SelectContent>
              </Select>
              {errors.fundingStatus && (
                <p className="text-red-500 text-xs">
                  {errors.fundingStatus[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue="ready">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-xs">{errors.category[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="publishStatus">Publish Status</Label>
              <Select name="publishStatus" defaultValue="saved">
                <SelectTrigger>
                  <SelectValue placeholder="Select publish status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saved">Saved</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              {errors.publishStatus && (
                <p className="text-red-500 text-xs">
                  {errors.publishStatus[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="boughtDate">Bought Date</Label>
              <Input type="date" id="boughtDate" name="boughtDate" />
              {errors.boughtDate && (
                <p className="text-red-500 text-xs">{errors.boughtDate[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="soldDate">Sold Date</Label>
              <Input type="date" id="soldDate" name="soldDate" />
              {errors.soldDate && (
                <p className="text-red-500 text-xs">{errors.soldDate[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentRent">Current Rent</Label>
              <Input
                type="number"
                id="currentRent"
                name="currentRent"
                required
                min="0"
              />
              {errors.currentRent && (
                <p className="text-red-500 text-xs">{errors.currentRent[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input type="date" id="completionDate" name="completionDate" />
              {errors.completionDate && (
                <p className="text-red-500 text-xs">
                  {errors.completionDate[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" required />
              {errors.location && (
                <p className="text-red-500 text-xs">{errors.location[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" required />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" required />
              {errors.country && (
                <p className="text-red-500 text-xs">{errors.country[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                type="number"
                id="latitude"
                name="latitude"
                required
                step="any"
              />
              {errors.latitude && (
                <p className="text-red-500 text-xs">{errors.latitude[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                type="number"
                id="longitude"
                name="longitude"
                required
                step="any"
              />
              {errors.longitude && (
                <p className="text-red-500 text-xs">{errors.longitude[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fundingStartDate">Funding Start Date</Label>
              <Input
                type="date"
                id="fundingStartDate"
                name="fundingStartDate"
              />
              {errors.fundingStartDate && (
                <p className="text-red-500 text-xs">
                  {errors.fundingStartDate[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fundingEndDate">Funding End Date</Label>
              <Input type="date" id="fundingEndDate" name="fundingEndDate" />
              {errors.fundingEndDate && (
                <p className="text-red-500 text-xs">
                  {errors.fundingEndDate[0]}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES_LIST.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    name="amenities"
                    value={amenity}
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
            {errors.amenities && (
              <p className="text-red-500 text-xs">{errors.amenities[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            <div
              {...getImageRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition"
            >
              <input {...getImageInputProps()} />
              <p>Drag 'n' drop images here, or click to select files</p>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Uploaded image ${index + 1}`}
                      width={96}
                      height={96}
                      className="object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-red-500 text-xs">{errors.images[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Videos</Label>
            <div
              {...getVideoRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition"
            >
              <input {...getVideoInputProps()} />
              <p>Drag 'n' drop videos here, or click to select files</p>
            </div>
            {videos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {videos.map((file, index) => (
                  <div key={index} className="relative">
                    <video
                      src={URL.createObjectURL(file)}
                      className="h-24 w-24 object-cover rounded-md"
                      controls
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 rounded-full"
                      onClick={() => removeVideo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {errors.videos && (
              <p className="text-red-500 text-xs">{errors.videos[0]}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
      {state.message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {state.message}
        </div>
      )}
    </Card>
  );
}
