"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<any>(null);

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_principal?: string;
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [items, setItems] =
    useState<any[]>([]);

  useEffect(() => {

    const data =
      localStorage.getItem(
        "carrito"
      );

    if (data) {
      setItems(JSON.parse(data));
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "carrito",
      JSON.stringify(items)
    );

  }, [items]);

  function addItem(
    producto: any
  ) {

    const existe =
      items.find(
        (i) =>
          i.id === producto.id
      );

    if (existe) {

      setItems(
        items.map((i) =>
          i.id === producto.id
            ? {
                ...i,
                cantidad:
                  i.cantidad + 1,
              }
            : i
        )
      );

      return;
    }

    setItems([
      ...items,
      {
        ...producto,
        cantidad: 1,
      },
    ]);
  }

  function removeItem(
    id: number
  ) {
    setItems(
      items.filter(
        (i) => i.id !== id
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(
    CartContext
  );
}