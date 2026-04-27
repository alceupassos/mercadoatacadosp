"use client";

import React, { createContext, useContext, useCallback } from "react";

type CartItem = {
  id: string;
  variant_id: string;
  title: string;
  quantity: number;
  unit_price: number;
  thumbnail?: string;
  size?: string;
  color?: string;
};

type CartContextType = {
  cartId: string | null;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  setCartId: (id: string) => void;
  setItems: (items: CartItem[]) => void;
  setSubtotal: (amount: number) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = React.useState(0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variant_id === item.variant_id);
      if (existing) {
        return prev.map((i) =>
          i.variant_id === item.variant_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setSubtotal(0);
    setCartId(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        itemCount,
        subtotal,
        setCartId,
        setItems,
        setSubtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
