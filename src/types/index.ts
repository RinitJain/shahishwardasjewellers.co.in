
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string; // This will be the category slug
  images: string[]; // URLs
  material: string;
  careInstructions: string;
  stock: number;
  'data-ai-hint'?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description?: string;
  'data-ai-hint'?: string;
}
