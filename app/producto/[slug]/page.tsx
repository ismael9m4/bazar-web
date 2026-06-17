import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  MessageCircle,
} from "lucide-react";
import AddToCartButton
from "@/components/AddToCartButton";

export default async function ProductPage({
params,
}: {
params: Promise<{
slug: string;
}>;
}) {
const { slug } = await params;

const { data: producto } =
await supabase
.from("productos")
.select("*")
.eq("slug", slug)
.single();

if (!producto) {
return ( <div className="max-w-7xl mx-auto p-10">
Producto no encontrado </div>
);
}

const mensaje = `
Hola 👋

Quiero consultar por este producto:

Producto: ${producto.nombre}
Precio: $${Number(producto.precio).toLocaleString()}

`;

const whatsapp =
  "https://wa.me/549385XXXXXXX?text=" +
  encodeURIComponent(mensaje);

return ( <main
   className="
   max-w-7xl
   mx-auto
   px-4
   py-8"
 > <Link
     href="/"
     className="
     inline-flex
     items-center
     gap-2
     text-blue-600
     hover:text-blue-700"
   > <ArrowLeft size={18} />
Volver al catálogo </Link>


  <div
    className="
    mt-6
    bg-white
    rounded-2xl
    shadow-sm
    border
    border-slate-200
    overflow-hidden"
  >
    <div
      className="
      grid
      lg:grid-cols-2"
    >
      <div
        className="
        p-6
        flex
        items-center
        justify-center
        bg-white"
      >
        <img
          src={
            producto.imagen_principal ||
            "/sin-imagen.jpg"
          }
          alt={producto.nombre}
          className="
          max-h-[600px]
          object-contain"
        />
      </div>

      <div className="p-8">

        <p
          className="
          text-sm
          text-slate-500"
        >
          Marca:
          {" "}
          {producto.marca ||
            "Genérica"}
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-slate-900
          mt-2"
        >
          {producto.nombre}
        </h1>

        <div
          className="
          mt-6"
        >
          <p
            className="
            text-5xl
            font-bold
            text-slate-900"
          >
            $
            {Number(
              producto.precio
            ).toLocaleString()}
          </p>

          <p
            className="
            text-green-600
            mt-2"
          >
            Hasta 6 cuotas sin interés
          </p>
        </div>

        <div
          className="
          mt-6"
        >
          {producto.stock > 0 ? (
            <span
              className="
              text-green-600
              font-semibold"
            >
              Stock disponible
              ({producto.stock})
            </span>
          ) : (
            <span
              className="
              text-red-600
              font-semibold"
            >
              Sin stock
            </span>
          )}
        </div>

        <div
          className="
          mt-8
          space-y-3"
        >
          <a
            href={whatsapp}
            target="_blank"
            className="
            flex
            items-center
            justify-center
            gap-2
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-4
            rounded-xl
            font-semibold"
          >
            <MessageCircle size={20} />
            Comprar por WhatsApp
          </a>

          <AddToCartButton
            producto={producto}
          />
        </div>

        <div
          className="
          mt-10
          border-t
          pt-6
          space-y-4"
        >
          <div
            className="
            flex
            items-center
            gap-3"
          >
            <Truck
              className="
              text-green-600"
            />
            <span>
              Envíos a todo el país
            </span>
          </div>

          <div
            className="
            flex
            items-center
            gap-3"
          >
            <ShieldCheck
              className="
              text-blue-600"
            />
            <span>
              Compra protegida
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    className="
    bg-white
    rounded-2xl
    shadow-sm
    border
    border-slate-200
    mt-8
    p-8"
  >
    <h2
      className="
      text-2xl
      font-bold
      mb-4"
    >
      Descripción
    </h2>

    <p
      className="
      text-slate-700
      leading-8"
    >
      {producto.descripcion}
    </p>
  </div>
</main>


);
}
