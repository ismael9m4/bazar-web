"use client";

import Link from "next/link";

import {
  ShoppingCart,
} from "lucide-react";

import {
  useCart
} from "@/context/CartContext";
import type {
  CartItem
} from "@/context/CartContext";


export default function CartIcon() {

  const { items } =
    useCart();

  const cantidad =
    items.reduce(
        (
        acc: number,
        item: CartItem
        ) =>
        acc + item.cantidad,
        0
    );

  return (
    <Link
      href="/carrito"
      className="relative"
    >
      <ShoppingCart
        size={28}
      />

      {cantidad > 0 && (
        <span
          className="
          absolute
          -top-2
          -right-2
          bg-blue-600
          text-white
          text-xs
          w-5
          h-5
          rounded-full
          flex
          items-center
          justify-center"
        >
          {cantidad}
        </span>
      )}
    </Link>
  );
}