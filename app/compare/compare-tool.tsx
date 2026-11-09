"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Temp } from "@/components/temp";
import { UnitToggle } from "@/components/unit-toggle";
import { cities, conditionInfo, getCity } from "@/lib/weather";

function CitySelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      >
        {cities.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CompareTool() {
  const [left, setLeft] = useState("copenhagen");
  const [right, setRight] = useState("dubai");
  const [shown, setShown] = useState(false);

  const a = getCity(left)!;
  const b = getCity(right)!;
  const diff = Math.abs(a.tempC - b.tempC);
  const warmer = a.tempC >= b.tempC ? a : b;

  const rows = [
    { name: "Temperature", a: <Temp c={a.tempC} />, b: <Temp c={b.tempC} /> },
    {
      name: "Condition",
      a: `${conditionInfo[a.condition].icon} ${conditionInfo[a.condition].label}`,
      b: `${conditionInfo[b.condition].icon} ${conditionInfo[b.condition].label}`,
    },
    { name: "Humidity", a: `${a.humidity}%`, b: `${b.humidity}%` },
    { name: "Wind", a: `${a.windKph} km/h`, b: `${b.windKph} km/h` },
    { name: "UV index", a: a.uvIndex, b: b.uvIndex },
  ];

  return (
    <>
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <CitySelect label="First city" value={left} onChange={setLeft} />
        <Button
          aria-label="Swap cities"
          onClick={() => {
            setLeft(right);
            setRight(left);
          }}
        >
          ⇄ Swap
        </Button>
        <CitySelect label="Second city" value={right} onChange={setRight} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={() => setShown(true)}>
          Compare
        </Button>
        {shown && <Button onClick={() => setShown(false)}>Hide results</Button>}
        <div className="ml-auto">
          <UnitToggle />
        </div>
      </div>

      {shown &&
        (a.slug === b.slug ? (
          <p role="alert" className="rounded-lg bg-amber-100 p-4 text-amber-900">
            Pick two different cities to compare.
          </p>
        ) : (
          <section aria-label="Comparison results" className="grid gap-4">
            <p className="text-lg">
              <strong>{warmer.name}</strong> is warmer by <strong>{diff}°C</strong>.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="p-3" />
                    <th className="p-3">{a.name}</th>
                    <th className="p-3">{b.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.name} className="border-t border-slate-200 dark:border-slate-800">
                      <th className="p-3 font-medium text-slate-500">{row.name}</th>
                      <td className="p-3">{row.a}</td>
                      <td className="p-3">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
    </>
  );
}
