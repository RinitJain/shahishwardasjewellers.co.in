import { ProductGrid } from '@/components/products/ProductGrid';
import { getProductsByCategory, getCategoryBySlug, categories as allCategories } from '@/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface CategoryPageProps {
  params: { categoryName: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.categoryName);
  if (!category) {
    return {
      title: 'Category Not Found | Shah Ishwardas Jewellers',
    };
  }
  return {
    title: `${category.name} | Shah Ishwardas Jewellers`,
    description: `Explore our collection of ${category.name.toLowerCase()}. ${category.description || ''}`,
  };
}

export async function generateStaticParams() {
  return allCategories.map((category) => ({
    categoryName: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryName } = params;
  const category = getCategoryBySlug(categoryName);
  const products = getProductsByCategory(categoryName);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-3xl text-destructive mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">The category you are looking for does not exist.</p>
        <Link href="/categories" className="text-primary hover:underline">
          View all categories
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/categories">Categories</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mb-4 font-headline text-4xl text-primary">{category.name}</h1>
      {category.description && <p className="mb-8 text-lg text-muted-foreground">{category.description}</p>}
      
      <ProductGrid products={products} />
    </div>
  );
}
