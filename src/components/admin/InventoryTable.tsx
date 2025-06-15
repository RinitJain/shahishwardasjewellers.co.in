"use client"; // If fetching/mutating data or using hooks

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data"; // Using mock data
import type { Product } from "@/types";
import Image from "next/image";
import { Edit, Trash2, PlusCircle } from "lucide-react";

// This is a placeholder. Real implementation would fetch from a database.
const inventory: Product[] = products;

export function InventoryTable() {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-headline text-primary">Product Inventory</h2>
        <Button variant="default">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <Table>
        <TableCaption>A list of current products in inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  width={50} 
                  height={66} 
                  className="rounded object-cover aspect-[3/4]"
                  data-ai-hint={product['data-ai-hint'] || "product image"}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="capitalize">{product.category.replace('-', ' ')}</TableCell>
              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                  {product.stock > 0 ? product.stock : "Out"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="icon" aria-label="Edit product">
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Delete product">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
