"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductGrid() {
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("activo", true);

    console.log(data, error);

    setProductos(data || []);
  }
  

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6"
    >
      {productos.map((p) => (
        <div
          key={p.id}
          className="
          bg-white
          rounded-xl
          shadow
          overflow-hidden
          hover:shadow-lg
          transition"
        >
          <img
            src={p.imagen_principal}
            alt={p.nombre}
            className="
            w-full
            h-64
            object-cover"
          />

          <div className="p-4">
            <h2 className="text-lg font-semibold">
              {p.nombre}
            </h2>

            <p className="text-2xl font-bold mt-2">
              ${Number(p.precio).toLocaleString()}
            </p>

            <a
              href={`/producto/${p.slug}`}
              className="
              block
              mt-4
              bg-blue-600
              text-white
              text-center
              py-2
              rounded-lg"
            >
              Ver producto
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}