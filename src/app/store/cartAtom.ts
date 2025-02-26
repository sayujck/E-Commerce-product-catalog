"use client";
import { atomWithStorage } from "jotai/utils";

// Define cart state with localStorage persistence
export const cartAtom = atomWithStorage("cart", [] as CartItem[]);

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};
