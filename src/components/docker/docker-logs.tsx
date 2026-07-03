"use client";

import { useContainerLogs } from "@/hooks/use-container-logs";

interface DockerLogsProps {
  id: string;
}

export function DockerLogs({
  id,
}: DockerLogsProps) {
  const {
    data,
    isLoading,
  } = useContainerLogs(id);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
        Chargement...
      </div>
    );
  }

  return (
    <pre className="max-h-[600px] overflow-auto rounded-3xl border border-white/10 bg-black p-6 font-mono text-xs text-green-400">
      {data}
    </pre>
  );
}