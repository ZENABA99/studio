import type { Product } from '@/types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const placeholder = PlaceHolderImages.find(p => p.id === id);
  return {
    src: placeholder?.imageUrl ?? 'https://picsum.photos/seed/placeholder/400/500',
    hint: placeholder?.imageHint || 'product'
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'ALEO NATUREL Pulp Drink',
    description: "Pure, stabilized aloe vera pulp for digestive health and nutrient absorption.",
    price: 29.99,
    image: getImage('product-drink-1'),
  },
  {
    id: '2',
    name: 'Aloe Berry Nectar',
    description: "A refreshing blend of aloe vera, cranberry, and apple for urinary health.",
    price: 32.50,
    image: getImage('product-drink-2'),
  },
  {
    id: '3',
    name: 'Soothing Aloe Gel',
    description: 'Topical gel for skin hydration and relief from minor irritations.',
    price: 19.99,
    image: getImage('product-gel-1'),
  },
  {
    id: '4',
    name: 'Aloe Immune Support',
    description: 'Daily supplement to maintain natural energy levels and support immunity.',
    price: 45.00,
    image: getImage('product-supplement-1'),
  },
];
