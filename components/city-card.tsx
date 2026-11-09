import Link from "next/link";
import { conditionInfo, type City } from "@/lib/weather";
import { FavoriteButton } from "./favorite-button";
import { Temp } from "./temp";

export function CityCard({ city }: { city: City }) {
  const { icon, label } = conditionInfo[city.condition];

  return (
    <article className="flex items-start justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <Link href={`/city/${city.slug}`} className="group block flex-1">
        <h3 className="font-semibold group-hover:text-sky-600">{city.name}</h3>
        <p className="text-sm text-slate-500">{city.country}</p>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            <Temp c={city.tempC} />
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {icon} {label}
          </span>
        </p>
      </Link>
      <FavoriteButton slug={city.slug} name={city.name} />
    </article>
  );
}
