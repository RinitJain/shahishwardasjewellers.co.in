
import { CategoryCard } from '@/components/products/CategoryCard';
import { ProductCard } from '@/components/products/ProductCard';
import { categories } from '@/lib/data';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';

async function getProducts() {
  // This is a server component, so we can't access localStorage.
  // We'll read from the static data file. For a real app with a DB, this would be a DB call.
  // The 'products' export from data.ts is the canonical list for the public site.
  // The localStorage logic in data.ts is for the client-side admin area.
  const dataFilePath = path.join(process.cwd(), 'src/lib/data.ts');
  // This is a simplified way to get the products array for the purpose of this example.
  // In a real scenario, you'd fetch from a database or a proper API endpoint.
  // For now, we will import it directly as the file is not a pure JSON.
  const { products } = await import('@/lib/data');
  return products;
}


export default async function HomePage() {
  const products = await getProducts();
  const featuredCategories = categories.slice(0, 3); // Show first 3 categories as featured
  const newArrivals = products.slice(0, 4); // Show first 4 products as new arrivals

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[400px] w-full overflow-hidden bg-gradient-to-r from-primary/10 via-background to-primary/5">
        <Image 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1964&auto=format&fit=crop"
          alt="Elegant Jewellery Collection"
          fill
          className="object-cover opacity-20"
          data-ai-hint="model jewellery"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary drop-shadow-md">
            Timeless Elegance, Crafted For You
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-foreground/80">
            Discover exquisite handcrafted jewellery that tells a story of heritage and artistry.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-lg shadow-lg transition-transform hover:scale-105">
            <Link href="/categories">Explore Collections</Link>
          </Button>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center font-headline text-2xl sm:text-3xl text-primary">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/categories">View All Collections</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center font-headline text-2xl sm:text-3xl text-primary">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="mt-8 text-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={`/categories/${categories[0]?.slug || 'all'}`}>Shop New In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action / Brand Story Teaser */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">A Legacy of Craftsmanship</h2>
          <p className="max-w-3xl mx-auto text-base sm:text-lg mb-8 text-primary-foreground/80">
            For generations, Shah Ishwardas Jewellers has been synonymous with trust, quality, and artistry. Each piece is a testament to our dedication to creating heirlooms that last a lifetime.
          </p>
          <Button variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link href="/about-us">Our Story</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
