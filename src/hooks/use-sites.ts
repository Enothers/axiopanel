"use client";

import { useQuery } from "@tanstack/react-query";

import type { Site } from "@/types/site";

export function useSites() {
  return useQuery<Site[]>({
    queryKey: ["sites"],

    queryFn: async () => {
      const res = await fetch("/api/sites");

      if (!res.ok) {
        throw new Error("Impossible de charger les sites.");
      }

      return res.json();
    },
  });
}