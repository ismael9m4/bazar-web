import Link from "next/link";
import {
  ShoppingCart,
  Star,
} from "lucide-react";

export default function ProductCard({
  producto,
}: {
  producto: any;
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      border
      border-slate-200
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      flex
      flex-col"
    >
      <div className="relative">

        <img
          src={
            producto.imagen_principal ||
            "/sin-imagen.jpg"
          }
          alt={producto.nombre}
          className="
          w-full
          h-64
          object-cover"
        />

        {producto.destacado && (
          <div
            className="
            absolute
            top-3
            left-3
            bg-yellow-400
            text-slate-900
            px-3
            py-1
            rounded-full
            text-xs
            font-bold
            flex
            items-center
            gap-1"
          >
            <Star size={12} />
            Destacado
          </div>
        )}

      </div>

      <div
        className="
        p-4
        flex
        flex-col
        flex-1"
      >
        <p
          className="
          text-xs
          uppercase
          tracking-wide
          text-slate-400
          mb-1"
        >
          {producto.marca || "Sin marca"}
        </p>

        <h2
          className="
          font-semibold
          text-slate-800
          line-clamp-2
          min-h-[56px]"
        >
          {producto.nombre}
        </h2>

        <div className="mt-3">

          <p
            className="
            text-3xl
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
            text-sm"
          >
            6 cuotas sin interés
          </p>

        </div>

        <div className="mt-3">

          {producto.stock > 0 ? (
            <span
              className="
              text-green-600
              text-sm
              font-medium"
            >
              Stock disponible
            </span>
          ) : (
            <span
              className="
              text-red-600
              text-sm
              font-medium"
            >
              Sin stock
            </span>
          )}

        </div>

        <div className="mt-auto pt-4">

          <Link
            href={`/producto/${producto.slug}`}
            className="
            flex
            items-center
            justify-center
            gap-2
            w-full
            bg-blue-500
            hover:bg-blue-600
            text-white
            py-3
            rounded-xl
            font-medium
            transition"
          >
            <ShoppingCart size={18} />
            Ver producto
          </Link>

        </div>

      </div>
    </div>
  );
}