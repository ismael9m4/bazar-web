import { supabase } from "@/lib/supabase";

export default async function Pedidos() {

  const { data } =
    await supabase
      .from("pedidos")
      .select("*")
      .order(
        "created_at",
        {
          ascending:false
        }
      );

  if (!data?.length) {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Pedidos
      </h1>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-10
        text-center"
      >
        No hay pedidos registrados
      </div>

    </div>
  );
}
}