"use client";

import React from "react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSidebar } from "@/app/contexts/sidebar-context";

const Navbar = () => {
  const { toggle } = useSidebar();

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="h-full px-4 md:px-6">
        <div className="flex items-center justify-between h-full gap-4">

          {/* Izquierda: hamburguesa (mobile) + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 -ml-2 md:hidden rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Image
              src="/Logo_UTFSM.png"
              alt="Universidad Técnica Federico Santa María"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>

          {/* Centro: reservado para título de sección (ej. "Sede") */}
          <div className="hidden md:flex flex-1 justify-center text-gray-900 font-semibold">
          </div>

          {/* Derecha: usuario */}
          <div className="flex items-center">
            <Link
              href="/users/register"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <UserCircleIcon className="size-8" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;