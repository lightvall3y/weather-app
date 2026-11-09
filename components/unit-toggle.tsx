"use client";

import { usePrefs, type Unit } from "@/lib/prefs";

const options: { value: Unit; label: string }[] = [
  { value: "c", label: "°C" },
  { value: "f", label: "°F" },
];

export function UnitToggle() {
  const { unit, setUnit } = usePrefs();

  return (
    <div
      role="group"
      aria-label="Temperature unit"
      className="inline-flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700"
    >
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={unit === value}
          onClick={() => setUnit(value)}
          className={`px-4 py-2 text-sm font-medium ${
            unit === value
              ? "bg-sky-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
