import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const readCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cartData");
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
};

const useBasket = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  const save = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cartData", JSON.stringify(items));
  };

  const onAdd = (input: CartItem) => {
    const existing = cartItems.find((item) => item._id === input._id);
    const updated = existing
      ? cartItems.map((item) => item._id === input._id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
      : [...cartItems, { ...input }];
    save(updated);
  };

  const onRemove = (input: CartItem) => {
    const existing = cartItems.find((item) => item._id === input._id);
    if (!existing) return;
    const updated = existing.quantity <= 1
      ? cartItems.filter((item) => item._id !== input._id)
      : cartItems.map((item) => item._id === input._id
          ? { ...item, quantity: item.quantity - 1 }
          : item);
    save(updated);
  };

  const onDelete = (input: CartItem) => {
    save(cartItems.filter((item) => item._id !== input._id));
  };

  const onDeleteALL = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  return { cartItems, onAdd, onRemove, onDelete, onDeleteALL };
};

export default useBasket;
