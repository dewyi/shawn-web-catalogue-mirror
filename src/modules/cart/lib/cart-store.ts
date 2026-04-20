import type { CartItem, CartState } from "@/modules/cart/types/cart.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function calculateSubtotal(items: CartItem[]): number {
  return (
    Math.round(
      items.reduce((sum, item) => {
        const price = Number.parseFloat(item.price);
        return sum + price * item.quantity;
      }, 0) * 100,
    ) / 100
  );
}

interface CartStore extends CartState {
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === newItem.productId);
          let items: CartItem[];

          if (existing) {
            items = state.items.map((item) =>
              item.productId === newItem.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          } else {
            items = [...state.items, { ...newItem, quantity: 1 }];
          }

          return {
            items,
            totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: calculateSubtotal(items),
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const items = state.items.filter((item) => item.productId !== productId);
          return {
            items,
            totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: calculateSubtotal(items),
          };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const items = state.items.filter((item) => item.productId !== productId);
            return {
              items,
              totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
              subtotal: calculateSubtotal(items),
            };
          }

          const items = state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          );
          return {
            items,
            totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: calculateSubtotal(items),
          };
        }),

      clearCart: () => set({ items: [], totalItems: 0, subtotal: 0 }),
    }),
    { name: "shawn-cart" },
  ),
);
