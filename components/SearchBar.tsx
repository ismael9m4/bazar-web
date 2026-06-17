"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {

  const router = useRouter();

  const [texto, setTexto] =
    useState("");

  function buscar() {

    if (!texto.trim()) return;

    router.push(
      `/buscar?q=${texto}`
    );
  }

  return (
    <div className="relative">

      <input
        value={texto}
        onChange={(e) =>
          setTexto(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            buscar();
          }
        }}
        placeholder="Buscar productos, marcas y más..."
        className="
        w-full
        bg-white
        rounded-lg
        h-11
        pl-4
        pr-12
        outline-none
        shadow-sm"
      />

      <button
        onClick={buscar}
        className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        text-slate-500
        hover:text-blue-600"
      >
        <Search size={22} />
      </button>

    </div>
  );
}