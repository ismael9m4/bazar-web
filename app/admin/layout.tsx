import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import LogoutButton from "@/components/LogoutButton";
export default function AdminLayout({
  children,
}:{
  children: React.ReactNode
}) {

  return (
    <AdminGuard>
    <div
      className="
      min-h-screen
      flex"
    >

      <aside
        className="
        w-72
        bg-slate-900
        text-white
        min-h-screen
        p-6"
        >

        <h1
            className="
            text-2xl
            font-bold
            mb-10"
        >
            Mi Bazar Admin
        </h1>

        <nav className="space-y-2">

            <Link
            href="/admin"
            className="
            block
            p-3
            rounded-lg
            hover:bg-slate-800"
            >
            Dashboard
            </Link>

            <Link
            href="/admin/productos"
            className="
            block
            p-3
            rounded-lg
            hover:bg-slate-800"
            >
            Productos
            </Link>

            <Link
            href="/admin/categorias"
            className="
            block
            p-3
            rounded-lg
            hover:bg-slate-800"
            >
            Categorías
            </Link>

            <Link
            href="/admin/pedidos"
            className="
            block
            p-3
            rounded-lg
            hover:bg-slate-800"
            >
            Pedidos
            </Link>
            

        </nav>
            <LogoutButton />
        </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
        
    </div>
    </AdminGuard>
  );
}