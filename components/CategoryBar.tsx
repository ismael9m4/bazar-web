import Link from "next/link";

export default function CategoryBar({
  categorias,
}: {
  categorias: any[];
}) {
  return (
    <div
      className="
      flex
      gap-3
      overflow-x-auto
      py-4"
    >
      {categorias.map((c) => (
        <Link
          key={c.id}
          href={`/categoria/${c.slug}`}
          className="
          whitespace-nowrap
          px-4
          py-2
          bg-white
          rounded-full
          shadow"
        >
          {c.nombre}
        </Link>
      ))}
    </div>
  );
}