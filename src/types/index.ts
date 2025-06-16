
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
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

// UserProfile is no longer needed as user auth system is removed.
// export interface UserProfile {
//   uid: string;
//   email: string | null;
//   username?: string;
//   phoneNumber?: string;
//   isAdmin?: boolean;
// }
