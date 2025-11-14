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
}

export interface CartItem extends Product {
  quantity: number;
}
