import { products } from '@/lib/products';
import ProductCard from '@/components/product/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product } from '@/types';

const categories = [
  {
    value: 'all',
    label: 'Tous les produits',
    products: products,
  },
  {
    value: 'soins-du-visage',
    label: 'Soins du visage',
    products: products.filter(p => p.category === 'face-care'),
  },
  {
    value: 'soins-du-corps',
    label: 'Soins du corps',
    products: products.filter(p => p.category === 'body-care'),
  },
  {
    value: 'soins-des-cheveux',
    label: 'Soins des cheveux',
    products: products.filter(p => p.category === 'hair-care'),
  },
  {
    value: 'nouveaute',
    label: 'Nouveautés',
    products: products.filter(p => p.tags?.includes('new')),
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Nos Produits</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Triés sur le volet pour votre santé et votre beauté.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            {category.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Aucun produit dans cette catégorie pour le moment.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}