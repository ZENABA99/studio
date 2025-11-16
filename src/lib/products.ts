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
    category: 'drinks',
  },
  {
    id: '2',
    name: 'Aloe Berry Nectar',
    description: "A refreshing blend of aloe vera, cranberry, and apple for urinary health.",
    price: 32.50,
    image: getImage('product-drink-2'),
    category: 'drinks',
  },
  {
    id: '3',
    name: 'Soothing Aloe Gel',
    description: 'Topical gel for skin hydration and relief from minor irritations.',
    price: 19.99,
    image: getImage('product-gel-1'),
    category: 'body-care',
  },
  {
    id: '4',
    name: 'Aloe Immune Support',
    description: 'Daily supplement to maintain natural energy levels and support immunity.',
    price: 45.00,
    image: getImage('product-supplement-1'),
    category: 'supplements',
  },
  {
    id: '5',
    name: 'Crème Visage Hydratante',
    description: 'Crème riche pour une hydratation profonde et un éclat naturel.',
    price: 38.00,
    image: getImage('product-face-cream'),
    category: 'face-care',
    tags: ['new']
  },
  {
    id: '6',
    name: 'Lotion Corporelle Apaisante',
    description: 'Lotion légère pour une peau douce, lisse et apaisée.',
    price: 25.00,
    image: getImage('product-body-lotion'),
    category: 'body-care',
  },
  {
    id: '7',
    name: 'Shampooing Réparateur',
    description: 'Nettoie en douceur et répare les cheveux abîmés.',
    price: 22.00,
    image: getImage('product-shampoo'),
    category: 'hair-care',
  },
  {
    id: '8',
    name: 'Baume à Lèvres Nutritif',
    description: 'Protège et hydrate vos lèvres avec la puissance de l\'aloe.',
    price: 8.50,
    image: getImage('product-lip-balm'),
    category: 'face-care',
    tags: ['new']
  },
  {
    id: '9',
    name: 'Masque Cheveux Réparateur',
    description: 'Masque intensif pour cheveux secs et abîmés.',
    price: 28.00,
    image: getImage('product-hair-mask'),
    category: 'hair-care',
    tags: ['new']
  },
  {
    id: '10',
    name: 'Vitality Boost',
    description: 'Un complément pour soutenir votre énergie et vitalité au quotidien.',
    price: 35.00,
    image: getImage('product-vitality-supplement'),
    category: 'supplements',
  },
  {
    id: '11',
    name: 'Immune Defense',
    description: 'Formule à base de plantes pour renforcer vos défenses naturelles.',
    price: 40.00,
    image: getImage('product-immune-supplement'),
    category: 'supplements',
    tags: ['new'],
  },
  {
    id: '12',
    name: 'Joint Comfort',
    description: 'Soutient le confort et la flexibilité des articulations.',
    price: 48.00,
    image: getImage('product-joint-supplement'),
    category: 'supplements',
  }
];
