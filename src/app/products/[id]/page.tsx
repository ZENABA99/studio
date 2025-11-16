'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';

// The 'params' object is a Promise, so we need to use a client component
// that is a child of this server component to handle the client-side logic.
export default function ProductDetailPage(props: { params: { id: string } }) {
  const params = use(Promise.resolve(props.params));
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}


function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  }
  
  const addToCartWithQuantity = (product: Product, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  }


  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image.src}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.image.hint}
          />
        </div>
        <div className="flex flex-col h-full">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
          <p className="mt-6 text-3xl font-bold font-headline text-primary">{product.price.toFixed(2)} FCFA</p>

          <div className="mt-8 flex-grow" />

          <div className="flex items-center gap-4 mt-8">
             <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-11 w-20 text-center text-lg font-bold"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            <Button size="lg" className="flex-grow" onClick={() => addToCartWithQuantity(product, quantity)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
