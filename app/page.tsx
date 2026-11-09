import Link from "next/link";
import { CityCard } from "@/components/city-card";
import { Temp } from "@/components/temp";
import { UnitToggle } from "@/components/unit-toggle";
import { cities, conditionInfo, getCity } from "@/lib/weather";

export default function HomePage() {
  const featured = getCity("copenhagen")!;
  const { icon, label } = conditionInfo[featured.condition];
  const popular = cities.filter((c) => ["london", "tokyo", "dubai"].includes(c.slug));

  return (
    <div className="grid gap-10">
      <section className="rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-8 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm opacity-80">Featured city</p>
            <h1 className="text-3xl font-bold">{featured.name}</h1>
            <p className="mt-4 text-6xl font-bold">
              <Temp c={featured.tempC} />
            </p>
            <p className="mt-2 text-lg">
              {icon} {label} · {featured.humidity}% humidity · {featured.windKph} km/h wind
            </p>
          </div>
          <UnitToggle />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/city/${featured.slug}`}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
          >
            See 7-day forecast
          </Link>
          <Link
            href="/cities"
            className="rounded-lg border border-white/60 px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            Browse all cities
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Popular right now</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      </section>
    </div>
  );
}
