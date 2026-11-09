"use client";

import { useState } from "react";
import { Button } from "./button";

export function RefreshButton() {
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  function refresh() {
    setLoading(true);
    setTimeout(() => {
      setUpdatedAt(new Date().toLocaleTimeString());
      setLoading(false);
    }, 800);
  }

  return (
    <div className="flex items-center gap-3">
      <Button onClick={refresh} disabled={loading}>
        {loading ? "Refreshing…" : "Refresh"}
      </Button>
      {updatedAt && (
        <span role="status" className="text-sm text-slate-500">
          Updated at {updatedAt}
        </span>
      )}
    </div>
  );
}
