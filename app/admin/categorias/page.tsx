import { supabase } from "@/lib/supabase";

export default async function Categorias() {

  const { data } =
    await supabase
      .from("categorias")
      .select("*")
      .order("nombre");

  return (
    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6"
      >
        Categorías
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

  <table className="w-full">

            <thead className="bg-gray-100">

            <tr>

                <th className="text-left p-4">
                ID
                </th>

                <th className="text-left p-4">
                Nombre
                </th>

                <th className="text-left p-4">
                Slug
                </th>

                <th className="text-left p-4">
                Estado
                </th>

            </tr>

            </thead>

            <tbody>

            {data?.map((c) => (

                <tr
                key={c.id}
                className="
                border-t
                hover:bg-gray-50"
                >

                <td className="p-4">
                    {c.id}
                </td>

                <td className="p-4 font-medium">
                    {c.nombre}
                </td>

                <td className="p-4 text-gray-500">
                    {c.slug}
                </td>

                <td className="p-4">
                    <span
                    className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm"
                    >
                    Activa
                    </span>
                </td>

                </tr>

            ))}

            </tbody>

        </table>

        </div>

    </div>
  );
}