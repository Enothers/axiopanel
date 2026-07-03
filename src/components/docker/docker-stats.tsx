"use client";

import { useContainerStats } from "@/hooks/use-container-stats";

interface Props {
  id: string;
}

export function DockerStats({ id }: Props) {
  const { data } = useContainerStats(id);

  if (!data) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Ressources
      </h2>

      <p>
        CPU : {data.cpu.toFixed(2)} %
      </p>

      <p>
        RAM :{" "}
        {(data.memory / 1024 / 1024).toFixed(1)} MB
      </p>

      <p>
        Limite :{" "}
        {(data.memoryLimit / 1024 / 1024 / 1024).toFixed(1)} GB
      </p>
    </div>
  );
}