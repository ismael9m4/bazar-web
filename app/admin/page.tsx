"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

  const [productos, setProductos] = useState(0);
  const [categorias, setCategorias] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    verificarSesion();
    cargarDatos();
  }, []);

  async function verificarSesion() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      location.href = "/login";
      return;
    }

    setEmail(user.email || "");
  }

  async function cargarDatos() {

    const { count: productosCount } =
      await supabase
        .from("productos")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: categoriasCount } =
      await supabase
        .from("categorias")
        .select("*", {
          count: "exact",
          head: true,
        });

    setProductos(productosCount || 0);
    setCategorias(categoriasCount || 0);
  }

  return (
    <div>

      <h1
        className="
        text-4xl
        font-bold
        mb-2"
      >
        Dashboard
      </h1>

      <p
        className="
        text-gray-500
        mb-8"
      >
        Usuario: {email}
      </p>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6"
      >

        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-6"
        >
          <p className="text-gray-500">
            Productos
          </p>

          <h2
            className="
            text-4xl
            font-bold"
          >
            {productos}
          </h2>
        </div>

        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-6"
        >
          <p className="text-gray-500">
            Categorías
          </p>

          <h2
            className="
            text-4xl
            font-bold"
          >
            {categorias}
          </h2>
        </div>

      </div>

    </div>
  );
}