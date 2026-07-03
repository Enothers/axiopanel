"use client";

import { useEffect, useState } from "react";

import { useSystem } from "./use-system";

interface HistoryPoint {
  cpu: number;
  ram: number;
}

export function useSystemHistory() {
  const { data } = useSystem();

  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    if (!data) return;

    setHistory((prev) => {
      const next = [
        ...prev,
        {
          cpu: data.cpu,
          ram:
            (data.memory.used /
              data.memory.total) *
            100,
        },
      ];

      return next.slice(-30);
    });
  }, [data]);

  return history;
}