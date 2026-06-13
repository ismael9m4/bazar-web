"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

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
    <div className="relative w-full">

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
        placeholder="Buscar productos..."
        type="text"
        className="
          w-full
          bg-white
          rounded-md
          p-3
          pr-12
          outline-none
          border
          border-gray-200
          focus:border-blue-500
        "
      />

      <button
        onClick={buscar}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-500
          hover:text-blue-600
        "
      >
        <Search size={20} />
      </button>

    </div>
  );
}