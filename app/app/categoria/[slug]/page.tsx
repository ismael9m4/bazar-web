import { supabase } from "@/lib/supabase";

export default async function Categoria({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } =
    await params;

  const { data: categoria } =
    await supabase
      .from("categorias")
      .select("*")
      .eq("slug", slug)
      .single();

  if (!categoria)
    return (
      <div>
        Categoría no encontrada
      </div>
    );

  const { data: productos } =
    await supabase
      .from("productos")
      .select("*")
      .eq(
        "categoria_id",
        categoria.id
      );

  return (
    <div className="p-8">

      <h1
        className="
        text-4xl
        font-bold"
      >
        {categoria.nombre}
      </h1>

      <div
        className="
        mt-8
        grid
        md:grid-cols-4
        gap-6"
      >
        {productos?.map((p) => (
          <div key={p.id}>
            {p.nombre}
          </div>
        ))}
      </div>

    </div>
  );
}