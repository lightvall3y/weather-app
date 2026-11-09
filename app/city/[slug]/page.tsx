import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/favorite-button";
import { RefreshButton } from "@/components/refresh-button";
import { Temp } from "@/components/temp";
import { UnitToggle } from "@/components/unit-toggle";
import { cities, conditionInfo, getCity, getForecast } from "@/lib/weather";

export function generateStaticParams() {
  return cities.map(({ slug }) => ({ slug }));
}

export default async function CityPage(props: PageProps<"/city/[slug]">) {
  const { slug } = await props.params;
  const city = getCity(slug);
  if (!city) notFound();

  const { icon, label } = conditionInfo[city.condition];
  const forecast = getForecast(city);
  const stats = [
    { name: "Humidity", value: `${city.humidity}%` },
    { name: "Wind", value: `${city.windKph} km/h` },
    { name: "UV index", value: String(city.uvIndex) },
  ];

  return (
    <div className="grid gap-8">
      <Link href="/cities" className="text-sm text-sky-600 hover:underline">
        ← All cities
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            {city.name}
            <FavoriteButton slug={city.slug} name={city.name} />
          </h1>
          <p className="text-slate-500">
            {city.country} · {city.region}
          </p>
        </div>
        <UnitToggle />
      </header>

      <section className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <p className="text-6xl font-bold">
          <Temp c={city.tempC} />
        </p>
        <p className="mt-2 text-lg">
          {icon} {label}
        </p>
        <dl className="mt-6 grid grid-cols-3 gap-4">
          {stats.map(({ name, value }) => (
            <div key={name}>
              <dt className="text-sm text-slate-500">{name}</dt>
              <dd className="text-lg font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <RefreshButton />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">7-day forecast</h2>
        <ul className="grid gap-2">
          {forecast.map((day) => (
            <li
              key={day.label}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800"
            >
              <span className="w-16 font-medium">{day.label}</span>
              <span className="flex-1">
                {conditionInfo[day.condition].icon} {conditionInfo[day.condition].label}
              </span>
              <span className="w-24 text-sm text-slate-500">💧 {day.rainChance}%</span>
              <span className="w-28 text-right">
                <Temp c={day.highC} /> / <Temp c={day.lowC} />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
