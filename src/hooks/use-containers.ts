"use client";

import { useQuery } from "@tanstack/react-query";

import { getContainers } from "@/services/docker/api";

export function useContainers() {
  return useQuery({
    queryKey: ["docker-containers"],
    queryFn: getContainers,
    refetchInterval: 5000,
  });
}