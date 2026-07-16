"use client";

import { useEffect } from "react";
import { useKeymap } from "@/lib/store";

/** Records an app visit into recently-viewed. Renders nothing. */
export function VisitTracker({ slug }: { slug: string }) {
  const visitApp = useKeymap((s) => s.visitApp);
  useEffect(() => {
    visitApp(slug);
  }, [slug, visitApp]);
  return null;
}
