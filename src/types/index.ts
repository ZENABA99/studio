export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    src: string;
    hint: string;
  };
  quantity?: number;
  category?: 'face-care' | 'body-care' | 'hair-care' | 'drinks' | 'supplements';
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}