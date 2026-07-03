"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getSystem,
  type SystemStats,
} from "@/services/system/get-system";

export function useSystem() {
  return useQuery<SystemStats>({
    queryKey: ["system"],
    queryFn: getSystem,
    refetchInterval: 5000,
  });
}