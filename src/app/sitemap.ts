export const dynamic = 'force-static';

import { MetadataRoute } from 'next'
import { categories } from '@/lib/data' // Assuming data.ts exports these
import type { Product } from '@/types';

const BASE_URL = 'https://www.shahjewellers.com'; // Replace with actual domain
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await import('@/lib/data');

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
     {
      url: `${BASE_URL}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/orders`, // Assuming orders page is now a static info page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Add other static pages like about, contact etc.
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/categories/${category.slug}`,
    lastModified: new Date(), 
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(), 
    changeFrequency: 'monthly',
    priority: 0.9,
  }));
 
  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
  ];
}
