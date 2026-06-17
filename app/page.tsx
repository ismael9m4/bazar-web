import { supabase } from "@/lib/supabase";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import CategoryBar from "@/components/CategoryBar";

export default async function Home() {

  const { data: productos } =
    await supabase
      .from("productos")
      .select("*")
      .eq("activo", true);

  const { data: categorias } =
    await supabase
      .from("categorias")
      .select("*")
      .order("nombre");

  return (
    <>
    

      <main
        className="
        max-w-7xl
        mx-auto
        px-4
        pb-16"
      >
        <Banner />

        <CategoryBar
          categorias={
            categorias || []
          }
        />

        <div
          className="
          flex
          items-center
          justify-between
          mt-10
          mb-6"
        >
          <div>
            <h2
              className="
              text-3xl
              font-bold
              text-slate-800"
            >
              Productos destacados
            </h2>

            <p
              className="
              text-slate-500
              mt-1"
            >
              Descubrí nuestras mejores ofertas
            </p>
          </div>
        </div>

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-5"
        >
          {productos?.map(
            (producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
              />
            )
          )}
        </div>
      </main>

      
    </>
  );
}