import { products } from '@/lib/products';
import ProductCard from '@/components/product/product-card';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Nos Produits</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Triés sur le volet pour votre santé et votre beauté.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
