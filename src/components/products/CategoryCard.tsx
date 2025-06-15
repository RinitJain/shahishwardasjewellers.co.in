import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-accent">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={category.imageUrl}
              alt={category.name}
              width={400}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={category['data-ai-hint'] || category.name.toLowerCase()}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors">
            {category.name}
          </CardTitle>
          {category.description && (
            <CardDescription className="mt-1 text-sm text-muted-foreground truncate">
              {category.description}
            </CardDescription>
          )}
          <div className="mt-3 flex items-center text-sm font-medium text-accent group-hover:underline">
            Shop Now <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
