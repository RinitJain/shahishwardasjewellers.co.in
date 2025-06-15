import { getProductBySlug, products as allProducts, getCategoryBySlug } from '@/lib/data';
import { Metadata } from 'next';
import Image from 'next/image'; // Using ProductImageGallery now
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductDetailsClient } from '@/components/products/ProductDetailsClient';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';


interface ProductPageProps {
  params: { productId: string }; // productId is the slug
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.productId);
  if (!product) {
    return {
      title: 'Product Not Found | Shah Ishwardas Jewellers',
    };
  }
  return {
    title: `${product.name} | Shah Ishwardas Jewellers`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    productId: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.productId);

  if (!product) {
    return (
       <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-3xl text-destructive mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product you are looking for does not exist.</p>
      </div>
    );
  }
  
  const category = getCategoryBySlug(product.category);

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
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <ProductImageGallery images={product.images} altText={product.name} productHint={product['data-ai-hint']} />
        
        <div className="space-y-6 py-4">
          <h1 className="font-headline text-3xl lg:text-4xl text-primary">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold text-foreground">${product.price.toFixed(2)}</p>
            {product.stock > 0 && product.stock < 10 && (
              <Badge variant="destructive">Low Stock</Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="outline">Out of Stock</Badge>
            )}
          </div>

          {category && (
            <Link href={`/categories/${category.slug}`} className="text-sm text-accent hover:underline">
              View more in {category.name}
            </Link>
          )}
          
          <Separator />
          
          <div>
            <h2 className="text-xl font-headline text-foreground mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          
          <Separator />

          <div>
            <h2 className="text-xl font-headline text-foreground mb-2">Details</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li><strong>Material:</strong> {product.material}</li>
              <li><strong>Category:</strong> <span className="capitalize">{product.category.replace('-', ' ')}</span></li>
              <li><strong>Availability:</strong> {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-headline text-foreground mb-2">Care Instructions</h2>
            <p className="text-muted-foreground leading-relaxed">{product.careInstructions}</p>
          </div>
          
          {product.stock > 0 && <ProductDetailsClient product={product} />}
        </div>
      </div>
    </div>
  );
}
