"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/components/cart/cart-provider';
import type { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0 border-b relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={product.image.src}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint={product.image.hint}
            />
          </div>
          {product.tags?.includes('new') && (
            <Badge className="absolute top-2 right-2">Nouveau</Badge>
          )}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline font-medium group-hover:text-primary transition-colors">{product.name}</CardTitle>
          <CardDescription className="mt-2 text-sm h-10">{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center bg-muted/50 mt-auto">
          <p className="text-xl font-bold text-foreground font-headline">${product.price.toFixed(2)}</p>
          <Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
