"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [loading,setLoading] =
    useState(false);

  async function login() {

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if(error){
      alert(error.message);
      return;
    }

    location.href="/admin";
  }

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center"
    >

      <div
        className="
        bg-white
        shadow-xl
        rounded-xl
        p-8
        w-full
        max-w-md"
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6"
        >
          Iniciar sesión
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
          className="
          border
          p-3
          w-full
          mb-3
          rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="
          border
          p-3
          w-full
          mb-4
          rounded"
        />

        <button
          onClick={login}
          disabled={loading}
          className="
          bg-blue-600
          text-white
          w-full
          py-3
          rounded-lg"
        >
          {
            loading
              ? "Ingresando..."
              : "Ingresar"
          }
        </button>

      </div>

    </div>
  );
}