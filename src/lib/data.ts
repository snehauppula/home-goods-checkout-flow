
import { Product } from './types';

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Modern Accent Chair",
    price: 299.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
    description: "Sleek mid-century modern accent chair with solid wood legs and comfortable upholstery."
  },
  {
    id: "2",
    name: "Ceramic Vase Set",
    price: 59.99,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800",
    description: "Set of 3 handcrafted ceramic vases with minimalist design, perfect for fresh or dried flowers."
  },
  {
    id: "3",
    name: "Wool Area Rug",
    price: 249.99,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800",
    description: "Hand-tufted wool area rug with geometric pattern in neutral tones, 5' x 8'."
  },
  {
    id: "4",
    name: "Edison Bulb Table Lamp",
    price: 89.99,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800",
    description: "Industrial-style table lamp with Edison bulb and matte black metal base."
  },
  {
    id: "5",
    name: "Copper Cookware Set",
    price: 399.99,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1584278858536-52532423b9ea?q=80&w=800",
    description: "Professional-grade copper cookware set with stainless steel lining, 10-piece set."
  },
  {
    id: "6",
    name: "Linen Duvet Cover",
    price: 129.99,
    category: "Bedding",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800",
    description: "Stonewashed linen duvet cover with button closure, available in Queen and King sizes."
  },
  {
    id: "7",
    name: "Marble Coffee Table",
    price: 449.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1577979497983-28f616a63f5b?q=80&w=800",
    description: "Elegant coffee table with genuine marble top and brass-finished metal frame."
  },
  {
    id: "8",
    name: "Succulent Plant Set",
    price: 39.99,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800",
    description: "Set of 3 assorted succulents in ceramic pots, low-maintenance living decor."
  }
];

// Create a function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};
