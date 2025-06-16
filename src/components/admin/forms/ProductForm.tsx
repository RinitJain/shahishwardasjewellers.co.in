
"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from '@/types';
import { categories } from '@/lib/data'; // For category dropdown
import { generateSlug } from '@/lib/utils';
import { useEffect } from 'react';

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  images: z.string().min(1, "At least one image URL is required (comma-separated)"), // Handled as comma-separated string
  material: z.string().min(2, "Material is required"),
  careInstructions: z.string().min(5, "Care instructions are required"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  'data-ai-hint': z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Product | null;
  isLoading?: boolean;
  submitButtonText?: string;
}

export function ProductForm({ onSubmit, initialData, isLoading, submitButtonText = "Save Product" }: ProductFormProps) {
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || "",
      images: initialData?.images?.join(', ') || "",
      material: initialData?.material || "",
      careInstructions: initialData?.careInstructions || "",
      stock: initialData?.stock || 0,
      'data-ai-hint': initialData?.['data-ai-hint'] || "",
    },
  });

  const watchedName = watch("name");

  useEffect(() => {
    if (watchedName && !initialData?.slug) { // Auto-generate slug only for new products or if slug is empty
      setValue("slug", generateSlug(watchedName));
    }
  }, [watchedName, setValue, initialData?.slug]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" {...register("name")} disabled={isLoading} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (auto-generated)</Label>
          <Input id="slug" {...register("slug")} disabled={isLoading} placeholder="Auto-generated from name"/>
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} disabled={isLoading} />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (Rs.)</Label>
          <Input id="price" type="number" step="0.01" {...register("price")} disabled={isLoading} />
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="images">Image URLs (comma-separated)</Label>
        <Textarea id="images" {...register("images")} placeholder="https://example.com/image1.png, https://example.com/image2.png" disabled={isLoading} />
        {errors.images && <p className="text-xs text-destructive">{errors.images.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="material">Material</Label>
          <Input id="material" {...register("material")} disabled={isLoading} />
          {errors.material && <p className="text-xs text-destructive">{errors.material.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input id="stock" type="number" {...register("stock")} disabled={isLoading} />
          {errors.stock && <p className="text-xs text-destructive">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="careInstructions">Care Instructions</Label>
        <Textarea id="careInstructions" {...register("careInstructions")} disabled={isLoading} />
        {errors.careInstructions && <p className="text-xs text-destructive">{errors.careInstructions.message}</p>}
      </div>
       <div className="space-y-2">
          <Label htmlFor="data-ai-hint">AI Hint (Optional, 1-2 keywords for image placeholder search)</Label>
          <Input id="data-ai-hint" {...register("data-ai-hint")} disabled={isLoading} placeholder="e.g. gold necklace"/>
          {errors['data-ai-hint'] && <p className="text-xs text-destructive">{errors['data-ai-hint'].message}</p>}
        </div>

      <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
        {isLoading ? "Saving..." : submitButtonText}
      </Button>
    </form>
  );
}
