
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/data';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen,
    checkout
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-sm">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-bold">Shopping Cart</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button 
              variant="outline" 
              onClick={() => setIsCartOpen(false)}
              className="mt-2"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-auto py-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-start py-3">
                  <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-sage mt-1">
                      {formatCurrency(item.product.price)}
                    </p>
                    
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-6 w-6 flex items-center justify-center rounded border border-input bg-background"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-6 w-6 flex items-center justify-center rounded border border-input bg-background"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Shipping</span>
                <span className="text-muted-foreground">Calculated at checkout</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatCurrency(cartTotal)}</span>
              </div>

              <SheetFooter className="flex flex-col gap-2 sm:gap-2 mt-4">
                <Button 
                  className="w-full bg-sage hover:bg-sage/90"
                  onClick={checkout}
                >
                  Checkout via WhatsApp
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
