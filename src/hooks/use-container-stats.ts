"use client";

import { useQuery } from "@tanstack/react-query";

import { getContainerStats } from "@/services/docker/stats";

export function useContainerStats(id: string) {
  return useQuery({
    queryKey: ["container-stats", id],
    queryFn: () => getContainerStats(id),
    enabled: !!id,
    refetchInterval: 2000,
  });
}