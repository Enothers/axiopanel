"use client";

import { useQuery } from "@tanstack/react-query";

import { getContainer } from "@/services/docker/details";

export function useContainer(id: string) {
  return useQuery({
    queryKey: ["container", id],
    queryFn: () => getContainer(id),
    enabled: !!id,
    refetchInterval: 5000,
  });
}