import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="text-2xl md:text-3xl font-headline text-red-500 bg-yellow-200 p-2 transition-colors hover:text-red-700"
      aria-label="Shah Ishwardas Jewellers Home"
    >
      Shah Ishwardas Jewellers
    </Link>
  );
}
