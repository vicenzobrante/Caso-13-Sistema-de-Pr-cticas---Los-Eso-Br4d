"use client";

import { useSidebar } from "@/app/docente/contexts/sidebar-context";

export function SidebarToggle() {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      className="p-2 md:hidden focus:outline-none focus:bg-gray-100 rounded"
      aria-label="Abrir menú"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}