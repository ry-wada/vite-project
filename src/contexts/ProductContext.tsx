// contexts/ProductContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

interface ProductContextType {
  products: Product[];
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
});

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "商品1",
      imageUrl: "src/picture/商品仮.jpg",
      price: 10.99,
      description: "商品1の説明文がここに入ります。",
    },
    {
      id: 2,
      name: "商品2",
      imageUrl: "src/picture/商品仮.jpg",
      price: 19.99,
      description: "商品2の説明文がここに入ります。",
    },
    {
      id: 3,
      name: "商品3",
      imageUrl: "src/picture/商品仮.jpg",
      price: 14.99,
      description: "商品3の説明文がここに入ります。",
    },
    {
      id: 4,
      name: "商品4",
      imageUrl: "src/picture/商品仮.jpg",
      price: 24.99,
      description: "商品4の説明文がここに入ります。",
    },
    {
      id: 5,
      name: "商品5",
      imageUrl: "src/picture/商品仮.jpg",
      price: 29.99,
      description: "商品5の説明文がここに入ります。",
    },
    {
      id: 6,
      name: "商品6",
      imageUrl: "src/picture/商品仮.jpg",
      price: 39.99,
      description: "商品6の説明文がここに入ります。",
    },
    {
      id: 7,
      name: "商品7",
      imageUrl: "src/picture/商品仮.jpg",
      price: 49.99,
      description: "商品7の説明文がここに入ります。",
    },
    {
      id: 8,
      name: "商品8",
      imageUrl: "src/picture/商品仮.jpg",
      price: 59.99,
      description: "商品8の説明文がここに入ります。",
    },
    {
      id: 9,
      name: "商品9",
      imageUrl: "src/picture/商品仮.jpg",
      price: 69.99,
      description: "商品9の説明文がここに入ります。",
    },
    {
      id: 10,
      name: "商品10",
      imageUrl: "src/picture/商品仮.jpg",
      price: 79.99,
      description: "商品10の説明文がここに入ります。",
    },
  ]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
