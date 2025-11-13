import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CheckCircle, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/product/product-card';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const benefitsImage = PlaceHolderImages.find(p => p.id === 'benefits-image');

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProductsSection />
      <BenefitsSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center p-4 pb-20 md:pb-24">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
          Pure Aloe, Pure Wellness
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80">
          Discover the exceptional purity of ALEO NATUREL. Support your digestive system and boost your well-being from the inside out.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/products">
              Shop Now <ShoppingCart className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#benefits">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  return (
    <section id="products" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="mt-2 text-lg text-muted-foreground">Handpicked for your health and beauty.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    "Exceptional purity of the inner leaf gel",
    "Aseptic processing without added preservatives",
    "Supports digestive system and nutrient absorption",
    "Maintains natural energy levels",
    "Certified by the International Aloe Science Council",
  ];

  return (
    <section id="benefits" className="bg-accent/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl order-last md:order-first">
            {benefitsImage && (
              <Image
                src={benefitsImage.imageUrl}
                alt={benefitsImage.description}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={benefitsImage.imageHint}
              />
            )}
          </div>
          <div className="md:order-last">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary-foreground">The ALEO NATUREL Promise</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We are committed to bringing you the best of nature, with products that meet the highest standards of quality and purity.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <span className="text-secondary-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
