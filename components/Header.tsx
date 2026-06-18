"use client";

import Link from "next/link";
import CartIcon
from "./CartIcon";
import {
  ShoppingCart,
  User,
  Store,
} from "lucide-react";

import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header
      className="
      sticky
      top-0
      z-50
      bg-[#FFE600]
      border-b
      border-yellow-300
      shadow-sm"
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4"
      >
        <div
          className="
          h-16
          flex
          items-center
          gap-6"
        >
          <Link
            href="/"
            className="
            flex
            items-center
            gap-2
            font-bold
            text-2xl
            text-slate-800
            whitespace-nowrap"
          >
            <Store size={30} />
            Mi Bazar
          </Link>

          <div className="flex-1">
            <SearchBar />
          </div>

          <div
            className="
            flex
            items-center
            gap-4"
          >
            <div
              className="
              flex
              items-center
              gap-4"
            >
              <CartIcon />

              <Link
                href="/login"
                className="
                p-2
                rounded-lg
                hover:bg-yellow-300
                transition"
              >
                <User size={28} />
              </Link>
            </div>

            
          </div>
        </div>
      </div>
    </header>
  );
}