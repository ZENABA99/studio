import { Leaf } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' },
];

const pageLinks = [
  { name: 'About', href: '/#benefits' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-8 md:mb-0">
            <Leaf className="h-8 w-8 text-secondary-foreground" />
            <span className="font-headline text-2xl font-bold text-secondary-foreground">AloeVeraShop</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-8 mb-8 md:mb-0">
            {pageLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">{link.name}</span>
                {/* Placeholder for actual icons */}
                <div className="h-6 w-6 bg-muted-foreground/20 rounded-full" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AloeVeraShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
