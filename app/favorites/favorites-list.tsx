"use client";

import Link from "next/link";
import { Button } from "@/components/button";
import { CityCard } from "@/components/city-card";
import { usePrefs } from "@/lib/prefs";
import { getCity } from "@/lib/weather";

export function FavoritesList() {
  const { favorites, clearFavorites } = usePrefs();
  const saved = favorites.map(getCity).filter((c) => c !== undefined);

  if (saved.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
        <p className="mb-4">No favorites yet. Tap the ☆ on any city to save it here.</p>
        <Link
          href="/cities"
          className="inline-block rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Browse cities
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p role="status" className="text-sm text-slate-500">
          {saved.length} saved
        </p>
        <Button onClick={clearFavorites}>Clear all</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </>
  );
}
