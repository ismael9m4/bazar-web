"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProductos() {

  const [productos, setProductos] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {

    const { data } = await supabase
      .from("productos")
      .select(`
        *,
        categorias(nombre)
      `)
      .order("id", {
        ascending: false,
      });

    setProductos(data || []);
  }

  async function eliminar(id: number) {

    const ok = confirm(
      "¿Eliminar este producto?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("productos")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    cargar();
  }

  const filtrados =
    productos.filter((p) =>
      p.nombre
        ?.toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  return (
    <div className="max-w-7xl mx-auto">

      <div
        className="
        flex
        justify-between
        items-center
        mb-6"
      >

        <h1
          className="
          text-3xl
          font-bold"
        >
          Productos
        </h1>

        <a
          href="/admin/productos/nuevo"
          className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg"
        >
          + Nuevo Producto
        </a>

      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-4
        mb-4"
      >

        <input
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
          placeholder="Buscar producto..."
          className="
          w-full
          border
          rounded-lg
          p-3"
        />

      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden"
      >

        <table className="w-full">

          <thead
            className="
            bg-gray-100"
          >

            <tr>

              <th className="p-4 text-left">
                Imagen
              </th>

              <th className="p-4 text-left">
                Producto
              </th>

              <th className="p-4 text-left">
                Categoría
              </th>

              <th className="p-4 text-left">
                Precio
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Estado
              </th>

              <th className="p-4 text-left">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {filtrados.map((p) => (

              <tr
                key={p.id}
                className="
                border-t
                hover:bg-gray-50"
              >

                <td className="p-4">

                  <img
                    src={
                      p.imagen_principal ||
                      "https://placehold.co/80x80"
                    }
                    alt={p.nombre}
                    className="
                    w-16
                    h-16
                    object-cover
                    rounded-lg"
                  />

                </td>

                <td className="p-4">

                  <div className="font-semibold">
                    {p.nombre}
                  </div>

                  <div
                    className="
                    text-sm
                    text-gray-500"
                  >
                    ID #{p.id}
                  </div>

                </td>

                <td className="p-4">
                  {p.categorias?.nombre ||
                    "-"}
                </td>

                <td
                  className="
                  p-4
                  font-semibold"
                >
                  $
                  {Number(
                    p.precio
                  ).toLocaleString()}
                </td>

                <td className="p-4">

                  {p.stock > 0 ? (
                    <span
                      className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm"
                    >
                      {p.stock}
                    </span>
                  ) : (
                    <span
                      className="
                      bg-red-100
                      text-red-700
                      px-3
                      py-1
                      rounded-full
                      text-sm"
                    >
                      Sin stock
                    </span>
                  )}

                </td>

                <td className="p-4">

                  {p.activo ? (
                    <span
                      className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm"
                    >
                      Activo
                    </span>
                  ) : (
                    <span
                      className="
                      bg-gray-200
                      text-gray-700
                      px-3
                      py-1
                      rounded-full
                      text-sm"
                    >
                      Inactivo
                    </span>
                  )}

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <a
                      href={`/admin/productos/editar/${p.id}`}
                      className="
                      bg-blue-600
                      text-white
                      px-3
                      py-2
                      rounded-lg"
                    >
                      Editar
                    </a>

                    <button
                      onClick={() =>
                        eliminar(p.id)
                      }
                      className="
                      bg-red-600
                      text-white
                      px-3
                      py-2
                      rounded-lg"
                    >
                      Eliminar
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}