"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    verificar();
  }, []);

  async function verificar() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      location.href = "/login";
      return;
    }

    setOk(true);
  }

  if (!ok) {
    return (
      <div className="p-10">
        Verificando sesión...
      </div>
    );
  }

  return <>{children}</>;
}