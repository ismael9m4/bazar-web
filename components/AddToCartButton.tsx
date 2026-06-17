"use client";

import {
  useCart
} from "@/context/CartContext";

export default function AddToCartButton({
  producto,
}:{
  producto:any
}) {

  const { addItem } =
    useCart();

  return (
    <button
      onClick={() =>
        addItem(producto)
      }
      className="
      w-full
      bg-blue-600
      hover:bg-blue-700
      text-white
      py-4
      rounded-xl
      font-semibold"
    >
      Agregar al carrito
    </button>
  );
}