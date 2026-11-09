"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrefs } from "@/lib/prefs";

const links = [
  { href: "/", label: "Home" },
  { href: "/cities", label: "Cities" },
  { href: "/compare", label: "Compare" },
  { href: "/favorites", label: "Favorites" },
  { href: "/settings", label: "Settings" },
];

export function Nav() {
  const pathname = usePathname();
  const { favorites } = usePrefs();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl flex-wrap items-center gap-1 px-4 py-3"
      >
        <Link href="/" className="mr-4 text-lg font-bold">
          🌤️ Weatherly
        </Link>
        {links.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm ${
                active
                  ? "bg-sky-100 font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-200"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {label}
              {href === "/favorites" && favorites.length > 0 && (
                <span className="ml-1.5 rounded-full bg-sky-600 px-1.5 py-0.5 text-xs text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
