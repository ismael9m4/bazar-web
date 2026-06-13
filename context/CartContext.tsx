"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [items, setItems] =
    useState<any[]>([]);

  useEffect(() => {

    const data =
      localStorage.getItem("cart");

    if (data) {
      setItems(JSON.parse(data));
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(items)
    );

  }, [items]);

  function addItem(producto: any) {

    const existe =
      items.find(
        (x) => x.id === producto.id
      );

    if (existe) {

      setItems(
        items.map((x) =>
          x.id === producto.id
            ? {
                ...x,
                cantidad:
                  x.cantidad + 1,
              }
            : x
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

  function removeItem(id: number) {

    setItems(
      items.filter(
        (x) => x.id !== id
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);