
import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartItem, Product } from '../lib/types';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        toast.success(`Increased ${product.name} quantity`);
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    const productName = cartItems.find(item => item.product.id === productId)?.product.name;
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.info(`Removed ${productName || 'item'} from cart`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const checkout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const cartDetails = cartItems.map(
      item => `${item.product.name} (${item.quantity}) @ ${item.product.price.toFixed(2)} = ${(item.product.price * item.quantity).toFixed(2)}`
    ).join('%0A');
    
    const totalAmount = cartTotal.toFixed(2);

    const encodedMessage = encodeURIComponent(
      `*Order Details:*%0A${cartDetails}%0A%0A*Total Amount:* ${totalAmount}%0A%0A*Customer Details:*%0APlease add your delivery address and contact information.`
    );

    window.open(
      `https://wa.me/918886113839?text=${encodedMessage}`,
      "_blank"
    );
    
    // Clear cart after checkout
    clearCart();
    setIsCartOpen(false);
    toast.success('Checkout initiated via WhatsApp');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
