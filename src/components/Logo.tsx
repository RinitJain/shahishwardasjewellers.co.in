import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="text-2xl md:text-3xl font-headline text-primary hover:text-primary/80 transition-colors" aria-label="Shah Ishwardas Jewellers Home">
      Shah Ishwardas Jewellers
    </Link>
  );
}
