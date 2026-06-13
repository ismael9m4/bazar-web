"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NuevoProducto() {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const [archivo, setArchivo] =
    useState<File | null>(null);

  const [categorias, setCategorias] =
    useState<any[]>([]);

  const [categoriaId, setCategoriaId] =
    useState("");

  useEffect(() => {
    cargarCategorias();
  }, []);

  async function cargarCategorias() {

    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .order("nombre");

    if (error) {
      console.log(error);
      return;
    }

    setCategorias(data || []);
  }

  async function guardar() {

    let imagenUrl = "";

    if (archivo) {

      const nombreArchivo =
        Date.now() +
        "-" +
        archivo.name;

      const { error: uploadError } =
        await supabase.storage
          .from("productos")
          .upload(
            nombreArchivo,
            archivo
          );

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("productos")
          .getPublicUrl(
            nombreArchivo
          );

      imagenUrl =
        data.publicUrl;
    }

    const { error } = await supabase
      .from("productos")
      .insert([
        {
          nombre,
          descripcion,
          precio: Number(precio),
          stock: 0,
          activo: true,
          imagen_principal: imagenUrl,

          categoria_id:
            categoriaId
              ? Number(categoriaId)
              : null,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Producto creado");

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setArchivo(null);
    setCategoriaId("");
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Nuevo Producto
      </h1>

      <div className="space-y-4">

        <input
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          placeholder="Nombre"
          className="border p-2 w-full"
        />

        <select
          value={categoriaId}
          onChange={(e) =>
            setCategoriaId(e.target.value)
          }
          className="border p-2 w-full"
        >
          <option value="">
            Seleccione categoría
          </option>

          {categorias.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >
              {c.nombre}
            </option>
          ))}
        </select>

        <textarea
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
          }
          placeholder="Descripción"
          className="border p-2 w-full"
        />

        <input
          type="number"
          value={precio}
          onChange={(e) =>
            setPrecio(e.target.value)
          }
          placeholder="Precio"
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setArchivo(
              e.target.files?.[0] || null
            )
          }
        />

        {archivo && (
          <img
            src={URL.createObjectURL(archivo)}
            alt="preview"
            className="
              w-48
              h-48
              object-cover
              rounded
              border
            "
          />
        )}

        <button
          onClick={guardar}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Guardar
        </button>

      </div>

    </div>
  );
}