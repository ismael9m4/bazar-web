"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header
      className="
      bg-yellow-400
      shadow-md
      sticky
      top-0
      z-50"
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        py-3
        flex
        items-center
        gap-4"
      >
        <Link
          href="/"
          className="
          text-2xl
          font-bold"
        >
          Mi Bazar
        </Link>

        <div className="flex-1 relative">
          

          <SearchBar 
            
          />
        </div>
        <Link href="/carrito">
          <ShoppingCart size={28} />
        </Link>

        <Link href="/login">
          <User size={28} />
        </Link>
      </div>
    </header>
  );
}