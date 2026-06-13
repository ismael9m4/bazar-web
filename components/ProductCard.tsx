import Link from "next/link";

export default function ProductCard({
  producto,
}: {
  producto: any;
}) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow
      hover:shadow-xl
      transition
      overflow-hidden"
    >
      <img
        src={
          producto.imagen_principal ||
          "/sin-imagen.jpg"
        }
        alt={producto.nombre}
        className="
        w-full
        h-72
        object-cover"
      />

      <div className="p-4">
        <h2
          className="
          font-semibold
          text-lg"
        >
          {producto.nombre}
        </h2>

        <p
          className="
          text-gray-500
          text-sm"
        >
          {producto.marca}
        </p>

        <p
          className="
          text-3xl
          font-bold
          mt-3"
        >
          $
          {Number(
            producto.precio
          ).toLocaleString()}
        </p>

        {producto.stock > 0 ? (
          <span
            className="
            text-green-600
            text-sm"
          >
            Stock disponible
          </span>
        ) : (
          <span
            className="
            text-red-600
            text-sm"
          >
            Sin stock
          </span>
        )}

        <Link
          href={`/producto/${producto.slug}`}
          className="
          block
          mt-4
          bg-blue-600
          text-white
          text-center
          py-3
          rounded-lg"
        >
          Ver producto
        </Link>
      </div>
    </div>
  );
}