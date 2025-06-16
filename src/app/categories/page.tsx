import { CategoryCard } from '@/components/products/CategoryCard';
import { categories } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Collections | Shah Ishwardas Jewellers',
  description: 'Browse all our exquisite jewellery collections.',
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 text-center font-headline text-3xl sm:text-4xl text-primary">
        Our Collections
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
