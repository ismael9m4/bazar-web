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
      <Header />

      <main
        className="
        max-w-7xl
        mx-auto
        px-4"
      >
        <Banner />

        <CategoryBar
          categorias={
            categorias || []
          }
        />

        <h2
          className="
          text-3xl
          font-bold
          mt-8
          mb-6"
        >
          Productos
        </h2>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6"
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

      <Footer />
    </>
  );
}