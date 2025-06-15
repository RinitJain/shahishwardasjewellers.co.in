import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/profile/', '/orders/'],
    },
    sitemap: 'https://www.shahjewellers.com/sitemap.xml', // Replace with actual domain
  }
}
