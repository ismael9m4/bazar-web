"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud } from "lucide-react";

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
  const [marca, setMarca] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [destacado, setDestacado] = useState(false);

  const [categorias, setCategorias] =
    useState<any[]>([]);

  const [imagenActual, setImagenActual] =
    useState("");

  const [archivo, setArchivo] =
    useState<File | null>(null);
  const [preview, setPreview] =
  useState("");

  useEffect(() => {
    async function cargar() {
      const { id } = await params;

      setId(Number(id));

      const { data: categoriasData } =
        await supabase
          .from("categorias")
          .select("*")
          .order("nombre");

      setCategorias(categoriasData || []);

      const { data, error } =
        await supabase
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
      setMarca(data.marca || "");

      setCategoriaId(
        String(data.categoria_id || "")
      );

      setDestacado(
        data.destacado || false
      );

      setImagenActual(
        data.imagen_principal || ""
      );
    }

    cargar();
  }, [params]);

  async function guardar() {

    if (!id) return;

    let imagenUrl = imagenActual;

    if (archivo) {

      const nombreArchivo =
        Date.now() +
        "-" +
        archivo.name;

      const {
        error: uploadError,
      } =
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

    const { error } =
      await supabase
        .from("productos")
        .update({
          nombre,
          descripcion,
          precio: Number(precio),
          stock: Number(stock),

          marca,

          categoria_id:
            categoriaId
              ? Number(categoriaId)
              : null,

          destacado,

          imagen_principal:
            imagenUrl,
        })
        .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Producto actualizado correctamente"
    );
  }

  return (
    <div
      className="
      max-w-3xl
      mx-auto
      p-6"
    >
      <div
        className="
        bg-white
        rounded-2xl
        shadow
        p-8"
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-8"
        >
          Editar Producto
        </h1>

        {imagenActual && (
          <div
            className="
            mb-8
            border
            rounded-xl
            p-4
            bg-slate-50"
          >
            <img
              src={imagenActual}
              alt=""
              className="
              h-72
              mx-auto
              object-contain"
            />
          </div>
        )}

        <div
          className="
          space-y-5"
        >
          <div>
            <label
              className="
              block
              mb-2
              font-medium"
            >
              Nombre
            </label>

            <input
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3"
            />
          </div>

          <div>
            <label
              className="
              block
              mb-2
              font-medium"
            >
              Marca
            </label>

            <input
              value={marca}
              onChange={(e) =>
                setMarca(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3"
            />
          </div>

          <div>
            <label
              className="
              block
              mb-2
              font-medium"
            >
              Categoría
            </label>

            <select
              value={categoriaId}
              onChange={(e) =>
                setCategoriaId(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3"
            >
              <option value="">
                Seleccionar categoría
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
          </div>

          <div>
            <label
              className="
              block
              mb-2
              font-medium"
            >
              Descripción
            </label>

            <textarea
              rows={5}
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3"
            />
          </div>

          <div>
            <label
              className="
              block
              mb-2
              font-medium"
            >
              Precio
            </label>

            <input
              type="number"
              value={precio}
              onChange={(e) =>
                setPrecio(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3"
            />
          </div>

          <div>
            <label
              className="
              block
              mb-2
              font-medium"
            >
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3"
            />
          </div>

          <div>

            <label
              className="
              block
              mb-3
              text-sm
              font-semibold
              text-slate-700"
            >
              Imagen del producto
            </label>

            <label
              className="
              relative
              cursor-pointer
              border-2
              border-dashed
              border-slate-300
              rounded-2xl
              bg-slate-50
              hover:bg-slate-100
              hover:border-blue-500
              transition-all
              duration-300
              h-56
              flex
              flex-col
              items-center
              justify-center
              gap-3"
            >

              <UploadCloud
                size={52}
                className="
                text-slate-400"
              />

              <span
                className="
                text-lg
                font-semibold
                text-slate-700"
              >
                Hacer click para subir imagen
              </span>

              <span
                className="
                text-sm
                text-slate-500"
              >
                JPG · PNG · WEBP
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0];

                  if (!file) return;

                  setArchivo(file);

                  setPreview(
                    URL.createObjectURL(file)
                  );
                }}
              />

            </label>

            {archivo && (

              <div
                className="
                mt-4
                bg-green-50
                border
                border-green-200
                rounded-xl
                p-4"
              >

                <p
                  className="
                  text-green-700
                  font-medium"
                >
                  ✅ Archivo seleccionado
                </p>

                <p
                  className="
                  text-sm
                  text-green-600
                  mt-1"
                >
                  {archivo.name}
                </p>

              </div>

            )}

            {preview && (

              <div
                className="
                mt-6
                bg-white
                border
                rounded-2xl
                p-4"
              >

                <p
                  className="
                  font-semibold
                  mb-4"
                >
                  Vista previa
                </p>

                <img
                  src={preview}
                  alt=""
                  className="
                  h-72
                  mx-auto
                  object-contain"
                />

              </div>

            )}

          </div>

          <label
            className="
            flex
            items-center
            gap-3"
          >
            <input
              type="checkbox"
              checked={destacado}
              onChange={(e) =>
                setDestacado(
                  e.target.checked
                )
              }
            />

            Producto destacado
          </label>

          <button
            onClick={guardar}
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-xl
            font-semibold
            transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}