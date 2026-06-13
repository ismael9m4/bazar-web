import { supabase } from "@/lib/supabase";

export default async function Buscar({
  searchParams,
}: any) {

  const q =
    searchParams.q || "";

  const { data } =
    await supabase
      .from("productos")
      .select("*")
      .ilike(
        "nombre",
        `%${q}%`
      );

  return (
    <div className="p-8">

      <h1
        className="
        text-3xl
        font-bold"
      >
        Resultados:
        {q}
      </h1>

      <div className="mt-8">
        {data?.map((p) => (
          <div key={p.id}>
            {p.nombre}
          </div>
        ))}
      </div>

    </div>
  );
}