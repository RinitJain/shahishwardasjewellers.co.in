export const dynamic = 'force-static';

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Removed /profile/ and /orders/ (assuming orders is now public)
    },
    sitemap: 'https://www.shahjewellers.com/sitemap.xml', // Replace with actual domain
  }
}
