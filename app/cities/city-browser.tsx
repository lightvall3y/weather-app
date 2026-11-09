"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { CityCard } from "@/components/city-card";
import { cities, regions, type Region } from "@/lib/weather";

type Sort = "name" | "warmest" | "coldest";

const sorts: { value: Sort; label: string }[] = [
  { value: "name", label: "A–Z" },
  { value: "warmest", label: "Warmest" },
  { value: "coldest", label: "Coldest" },
];

export function CityBrowser() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | null>(null);
  const [sort, setSort] = useState<Sort>("name");

  const visible = cities
    .filter((c) => !region || c.region === region)
    .filter((c) => `${c.name} ${c.country}`.toLowerCase().includes(query.toLowerCase()))
    .toSorted((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "warmest"
          ? b.tempC - a.tempC
          : a.tempC - b.tempC,
    );

  return (
    <>
      <div className="grid gap-4">
        <input
          type="search"
          aria-label="Search cities"
          placeholder="Search by city or country…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700"
        />
        <div role="group" aria-label="Filter by region" className="flex flex-wrap gap-2">
          <Button
            aria-pressed={region === null}
            variant={region === null ? "primary" : "secondary"}
            onClick={() => setRegion(null)}
          >
            All
          </Button>
          {regions.map((r) => (
            <Button
              key={r}
              aria-pressed={region === r}
              variant={region === r ? "primary" : "secondary"}
              onClick={() => setRegion(r)}
            >
              {r}
            </Button>
          ))}
        </div>
        <div role="group" aria-label="Sort cities" className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-500">Sort:</span>
          {sorts.map(({ value, label }) => (
            <Button
              key={value}
              aria-pressed={sort === value}
              variant={sort === value ? "primary" : "secondary"}
              onClick={() => setSort(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <p role="status" className="text-sm text-slate-500">
        {visible.length} {visible.length === 1 ? "city" : "cities"}
      </p>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
          <p className="mb-4">No cities match your filters.</p>
          <Button
            onClick={() => {
              setQuery("");
              setRegion(null);
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      )}
    </>
  );
}
