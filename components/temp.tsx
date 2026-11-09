"use client";

import { formatTemp, usePrefs } from "@/lib/prefs";

export function Temp({ c }: { c: number }) {
  const { unit } = usePrefs();
  return <>{formatTemp(c, unit)}</>;
}
