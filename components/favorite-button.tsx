"use client";

import { usePrefs } from "@/lib/prefs";

export function FavoriteButton({ slug, name }: { slug: string; name: string }) {
  const { favorites, toggleFavorite } = usePrefs();
  const isFavorite = favorites.includes(slug);

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      onClick={() => toggleFavorite(slug)}
      className="rounded-full p-2 text-xl leading-none hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
