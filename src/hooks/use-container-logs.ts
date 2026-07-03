"use client";

import { useQuery } from "@tanstack/react-query";

import { getContainerLogs } from "@/services/docker/logs";

export function useContainerLogs(id: string) {
  return useQuery({
    queryKey: ["container-logs", id],
    queryFn: () => getContainerLogs(id),
    enabled: !!id,
    refetchInterval: 3000,
  });
}