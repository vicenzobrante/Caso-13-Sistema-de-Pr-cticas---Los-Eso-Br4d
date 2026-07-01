"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/app/coordinador/contexts/sidebar-context";

const menuItems = [
  { name: "Usuarios", href: "/coordinador/usuarios" },
  { name: "Documentos", href: "/coordinador/documentos" },
];

// Altura de tu Navbar. Ajusta si no es h-16 (4rem)
const NAVBAR_HEIGHT = "4rem";

export default function Sidebar() {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* Overlay solo en mobile, para cerrar tocando afuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={close}
        />
      )}

      <aside
        style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT})` }}
        className={`
          fixed left-0 z-40 w-64
          bg-[#ECECF6] border-r border-[#D8D8E6]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:sticky md:top-16
        `}
      >
        <nav className="flex flex-col gap-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`px-3 py-2.5 rounded-md text-sm transition-colors text-xl ${
                  isActive
                    ? "font-bold text-gray-900"
                    : "font-medium text-gray-600 hover:bg-white/60 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}