import Link from 'next/link';
import { Logo } from '@/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-muted/50 text-muted-foreground">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo />
            <p className="mt-2 text-sm">
              Exquisite jewellery, timeless designs. Since 19XX.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg text-foreground mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/categories" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg text-foreground mb-2">Customer Care</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/care" className="hover:text-primary transition-colors">Jewellery Care</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Shah Ishwardas Jewellers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
