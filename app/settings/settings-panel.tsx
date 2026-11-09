"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { UnitToggle } from "@/components/unit-toggle";
import { usePrefs } from "@/lib/prefs";

export function SettingsPanel() {
  const { favorites, reset } = usePrefs();
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="grid max-w-xl gap-8">
      <section className="grid gap-3">
        <h2 className="font-semibold">Temperature unit</h2>
        <UnitToggle />
      </section>

      <section className="grid gap-3">
        <h2 className="font-semibold">Your data</h2>
        <p className="text-sm text-slate-500">
          {favorites.length} favorite {favorites.length === 1 ? "city" : "cities"} stored in this
          browser.
        </p>
        {confirming ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm">Reset unit and delete all favorites?</span>
            <Button
              variant="danger"
              onClick={() => {
                reset();
                setConfirming(false);
                setDone(true);
              }}
            >
              Yes, reset
            </Button>
            <Button onClick={() => setConfirming(false)}>Cancel</Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                setDone(false);
                setConfirming(true);
              }}
            >
              Reset all data
            </Button>
          </div>
        )}
        {done && (
          <p role="status" className="text-sm text-green-700 dark:text-green-400">
            Everything was reset.
          </p>
        )}
      </section>
    </div>
  );
}
