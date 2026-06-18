"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud } from "lucide-react";

export default function NuevoProducto() {

const [nombre, setNombre] =
useState("");

const [descripcion, setDescripcion] =
useState("");

const [precio, setPrecio] =
useState("");

const [stock, setStock] =
useState("0");

const [marca, setMarca] =
useState("");

const [destacado, setDestacado] =
useState(false);

const [archivo, setArchivo] =
useState<File | null>(null);

const [preview, setPreview] =
useState("");

const [categorias, setCategorias] =
useState<any[]>([]);

const [categoriaId, setCategoriaId] =
useState("");

useEffect(() => {
cargarCategorias();
}, []);

async function cargarCategorias() {


const { data, error } =
  await supabase
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

const slug =
  nombre
    .toLowerCase()
    .replaceAll(" ", "-");

const { error } =
  await supabase
    .from("productos")
    .insert([
      {
        nombre,
        descripcion,
        precio:
          Number(precio),

        stock:
          Number(stock),

        marca,

        slug,

        destacado,

        activo: true,

        imagen_principal:
          imagenUrl,

        categoria_id:
          categoriaId
            ? Number(
                categoriaId
              )
            : null,
      },
    ]);

if (error) {
  alert(error.message);
  return;
}

alert(
  "Producto creado correctamente"
);

setNombre("");
setDescripcion("");
setPrecio("");
setStock("0");
setMarca("");
setDestacado(false);
setArchivo(null);
setPreview("");
setCategoriaId("");

}

return ( <div
   className="
   max-w-3xl
   mx-auto
   p-6"
 > <div
     className="
     bg-white
     rounded-2xl
     shadow
     p-8"
   > <h1
       className="
       text-3xl
       font-bold
       mb-8"
     >
Nuevo Producto </h1>

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
          onChange={(e)=>
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
          onChange={(e)=>
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
          onChange={(e)=>
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

          {categorias.map((c)=>(
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
          onChange={(e)=>
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
          onChange={(e)=>
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
          Stock inicial
        </label>

        <input
          type="number"
          value={stock}
          onChange={(e)=>
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
          font-medium"
        >
          Imagen del producto
        </label>

        <label
          className="
          cursor-pointer
          border-2
          border-dashed
          border-slate-300
          rounded-2xl
          bg-slate-50
          hover:bg-slate-100
          hover:border-blue-500
          transition
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
            font-semibold"
          >
            Hacer click para subir
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
            onChange={(e)=>{

              const file =
                e.target.files?.[0];

              if (!file) return;

              setArchivo(file);

              setPreview(
                URL.createObjectURL(
                  file
                )
              );
            }}
          />
        </label>

      </div>

      {archivo && (

        <div
          className="
          bg-green-50
          border
          border-green-200
          rounded-xl
          p-4"
        >
          ✅ {archivo.name}
        </div>

      )}

      {preview && (

        <div
          className="
          bg-white
          border
          rounded-2xl
          p-4"
        >
          <p
            className="
            font-semibold
            mb-3"
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

      <label
        className="
        flex
        items-center
        gap-3"
      >
        <input
          type="checkbox"
          checked={destacado}
          onChange={(e)=>
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
        Crear producto
      </button>
    </div>
  </div>
</div>


);
}
