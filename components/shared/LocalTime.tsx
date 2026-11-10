"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function subscribe(cb: () => void) {
  // Tick aligned to the next minute boundary, then every 60s.
  let interval: ReturnType<typeof setInterval> | undefined;
  const timeout = setTimeout(() => {
    cb();
    interval = setInterval(cb, 60_000);
  }, 60_000 - (Date.now() % 60_000));
  return () => {
    clearTimeout(timeout);
    if (interval) clearInterval(interval);
  };
}

/** Mumbai time (IST). Server + hydration render a stable placeholder, so no mismatch. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "--:--",
  );
  return (
    <time className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {time} IST
    </time>
  );
}
