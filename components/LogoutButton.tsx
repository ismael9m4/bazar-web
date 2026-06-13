"use client";

import { supabase } from "@/lib/supabase";

export default function LogoutButton() {

  async function salir() {

    await supabase.auth.signOut();

    location.href="/login";
  }

  return (
    <button
      onClick={salir}
      className="
      w-full
      bg-red-600
      text-white
      p-3
      rounded-lg
      mt-8"
    >
      Cerrar sesión
    </button>
  );
}