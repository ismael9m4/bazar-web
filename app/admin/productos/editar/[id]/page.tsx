"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditarProducto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<number | null>(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    async function cargar() {
      const { id } = await params;

      setId(Number(id));

      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setNombre(data.nombre || "");
      setDescripcion(data.descripcion || "");
      setPrecio(String(data.precio || ""));
      setStock(String(data.stock || ""));
    }

    cargar();
  }, [params]);

  async function guardar() {
    if (!id) return;

    const { error } = await supabase
      .from("productos")
      .update({
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Producto actualizado");
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Editar Producto
      </h1>

      <div className="space-y-4">

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="border p-2 w-full"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="border p-2 w-full"
        />

        <input
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio"
          className="border p-2 w-full"
        />

        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          className="border p-2 w-full"
        />

        <button
          onClick={guardar}
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Guardar cambios
        </button>

      </div>

    </div>
  );
}