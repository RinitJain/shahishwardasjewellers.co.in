
import type { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Necklaces', slug: 'necklaces', imageUrl: 'https://placehold.co/400x300.png', description: 'Elegant necklaces for every occasion.', 'data-ai-hint': 'gold necklaces' },
  { id: '2', name: 'Rings', slug: 'rings', imageUrl: 'https://placehold.co/400x300.png', description: 'Beautiful rings to adorn your fingers.', 'data-ai-hint': 'diamond rings' },
  { id: '3', name: 'Earrings', slug: 'earrings', imageUrl: 'https://placehold.co/400x300.png', description: 'Stunning earrings to complete your look.', 'data-ai-hint': 'gemstone earrings' },
  { id: '4', name: 'Bracelets', slug: 'bracelets', imageUrl: 'https://placehold.co/400x300.png', description: 'Chic bracelets for a touch of glamour.', 'data-ai-hint': 'silver bracelets' },
  { id: '5', name: 'Bridal Collection', slug: 'bridal-collection', imageUrl: 'https://placehold.co/400x300.png', description: 'Exquisite pieces for your special day.', 'data-ai-hint': 'bridal sets' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Seraphina Gold Necklace',
    slug: 'seraphina-gold-necklace',
    description: 'A timeless piece crafted from 22k gold, featuring intricate floral patterns. Perfect for weddings and grand occasions.',
    price: 1250.00,
    category: 'necklaces',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    material: '22k Gold',
    careInstructions: 'Store in a soft pouch. Avoid contact with perfumes and chemicals. Clean with a soft, dry cloth.',
    stock: 10,
    'data-ai-hint': 'gold necklace indian',
  },
  {
    id: '2',
    name: 'Orion Diamond Ring',
    slug: 'orion-diamond-ring',
    description: 'An exquisite solitaire diamond ring set in platinum. Its brilliance captures the essence of eternal love.',
    price: 2800.00,
    category: 'rings',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    material: 'Platinum, 1.5ct Diamond (VS1, G Color)',
    careInstructions: 'Clean regularly with a specialized diamond cleaner. Avoid hard knocks. Store separately.',
    stock: 5,
    'data-ai-hint': 'diamond ring solitaire',
  },
  {
    id: '3',
    name: 'Azure Drop Earrings',
    slug: 'azure-drop-earrings',
    description: 'Elegant drop earrings featuring pear-shaped sapphires surrounded by a halo of micro-pavé diamonds, set in 18k white gold.',
    price: 950.00,
    category: 'earrings',
    images: ['https://placehold.co/600x800.png'],
    material: '18k White Gold, Sapphires, Diamonds',
    careInstructions: 'Handle with care. Clean with a soft cloth. Avoid ultrasonic cleaners for gemstone jewelry.',
    stock: 15,
    'data-ai-hint': 'sapphire earrings diamonds',
  },
  {
    id: '4',
    name: 'Luna Silver Bracelet',
    slug: 'luna-silver-bracelet',
    description: 'A delicate sterling silver chain bracelet with moonstone charms. Perfect for everyday elegance.',
    price: 350.00,
    category: 'bracelets',
    images: ['https://placehold.co/600x800.png'],
    material: 'Sterling Silver, Moonstones',
    careInstructions: 'Polish regularly with a silver polishing cloth. Store in an anti-tarnish bag.',
    stock: 20,
    'data-ai-hint': 'silver bracelet moonstone',
  },
  {
    id: '5',
    name: 'Maharani Bridal Set',
    slug: 'maharani-bridal-set',
    description: 'A majestic bridal set including a kundan necklace, matching earrings, and maang tikka, adorned with pearls and rubies.',
    price: 4500.00,
    category: 'bridal-collection',
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    material: 'Gold-plated alloy, Kundan, Pearls, Rubies',
    careInstructions: 'Keep away from moisture and direct heat. Store in a velvet-lined box.',
    stock: 3,
    'data-ai-hint': 'indian bridal jewelry',
  },
  {
    id: '6',
    name: 'Eternal Knot Gold Hoops',
    slug: 'eternal-knot-gold-hoops',
    description: 'Classic gold hoop earrings with a subtle eternal knot design. Versatile for both casual and formal wear.',
    price: 480.00,
    category: 'earrings',
    images: ['https://placehold.co/600x800.png'],
    material: '18k Yellow Gold',
    careInstructions: 'Wipe with a soft cloth after wear. Avoid harsh chemicals.',
    stock: 12,
    'data-ai-hint': 'gold hoop earrings',
  },
   {
    id: '7',
    name: 'Celestial Pendant Necklace',
    slug: 'celestial-pendant-necklace',
    description: 'A beautiful rose gold pendant necklace featuring a star motif encrusted with tiny diamonds.',
    price: 720.00,
    category: 'necklaces',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    material: '14k Rose Gold, Diamonds',
    careInstructions: 'Store separately to avoid scratches. Clean gently with a soft brush and mild soap.',
    stock: 8,
    'data-ai-hint': 'rose gold necklace diamond',
  },
  {
    id: '8',
    name: 'Royal Emerald Ring',
    slug: 'royal-emerald-ring',
    description: 'A statement ring featuring a large, GIA-certified emerald surrounded by a double halo of diamonds, set in white gold.',
    price: 5200.00,
    category: 'rings',
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    material: '18k White Gold, Emerald, Diamonds',
    careInstructions: 'Emeralds are delicate; avoid temperature shocks and harsh chemicals. Professional cleaning recommended.',
    stock: 2,
    'data-ai-hint': 'emerald ring diamond halo',
  },
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => product.category === categorySlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  if (!query) return [];
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) ||
    product.description.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery)
  );
};
