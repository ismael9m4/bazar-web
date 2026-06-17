import Link from "next/link";
import {
  ChefHat,
  CupSoda,
  Thermometer,
  Home,
} from "lucide-react";

export default function CategoryBar({
  categorias,
}: {
  categorias: any[];
}) {

  function getIcon(slug: string) {

    switch (slug) {

      case "cocina":
        return <ChefHat size={18} />;

      case "vasos":
        return <CupSoda size={18} />;

      case "termos":
        return <Thermometer size={18} />;

      default:
        return <Home size={18} />;
    }
  }

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-slate-200
      p-4
      mt-6"
    >
      <div
        className="
        flex
        gap-3
        overflow-x-auto"
      >
        {categorias.map((c) => (
          <Link
            key={c.id}
            href={`/categoria/${c.slug}`}
            className="
            flex
            items-center
            gap-2
            whitespace-nowrap
            px-5
            py-3
            rounded-xl
            bg-slate-50
            hover:bg-blue-50
            hover:text-blue-600
            border
            border-slate-200
            transition"
          >
            {getIcon(c.slug)}

            <span
              className="
              font-medium"
            >
              {c.nombre}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}