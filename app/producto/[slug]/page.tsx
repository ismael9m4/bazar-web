import { supabase } from "@/lib/supabase";
import Link from "next/link";

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
    return (
      <div className="p-10">
        Producto no encontrado
      </div>
    );
  }

  const whatsapp =
    `https://wa.me/549385XXXXXXX?text=` +
    encodeURIComponent(
      `Hola quiero comprar ${producto.nombre}`
    );

  return (
    <main
      className="
      max-w-7xl
      mx-auto
      p-6"
    >
      <Link
        href="/"
        className="text-blue-600"
      >
        ← Volver
      </Link>

      <div
        className="
        mt-6
        grid
        md:grid-cols-2
        gap-10"
      >
        <div>
          <img
            src={
              producto.imagen_principal
            }
            alt={producto.nombre}
            className="
            w-full
            rounded-xl
            shadow"
          />
        </div>

        <div>
          <h1
            className="
            text-4xl
            font-bold"
          >
            {producto.nombre}
          </h1>

          <p
            className="
            mt-6
            text-gray-700"
          >
            {producto.descripcion}
          </p>

          <p
            className="
            text-5xl
            font-bold
            mt-8"
          >
            $
            {Number(
              producto.precio
            ).toLocaleString()}
          </p>

          <p className="mt-3">
            Stock:
            <strong>
              {" "}
              {producto.stock}
            </strong>
          </p>

          <a
            href={whatsapp}
            target="_blank"
            className="
            inline-block
            mt-8
            bg-green-600
            text-white
            px-8
            py-4
            rounded-xl"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}