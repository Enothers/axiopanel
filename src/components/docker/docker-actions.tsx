"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Play,
  RotateCw,
  Square,
  Trash2,
} from "lucide-react";

import {
  restartContainer,
  startContainer,
  stopContainer,
} from "@/services/docker/actions";

import { deleteContainer } from "@/services/docker/delete";

interface DockerActionsProps {
  id: string;
}

export function DockerActions({
  id,
}: DockerActionsProps) {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["docker-containers"],
    });

    queryClient.invalidateQueries({
      queryKey: ["container", id],
    });
  };

  const start = useMutation({
    mutationFn: () => startContainer(id),
    onSuccess: refresh,
  });

  const stop = useMutation({
    mutationFn: () => stopContainer(id),
    onSuccess: refresh,
  });

  const restart = useMutation({
    mutationFn: () => restartContainer(id),
    onSuccess: refresh,
  });

  const remove = useMutation({
    mutationFn: () => deleteContainer(id),
    onSuccess: refresh,
  });

  return (
    <div
      className="flex gap-2"
      onClick={(e) => e.preventDefault()}
    >
      <button
        onClick={() => start.mutate()}
        disabled={start.isPending}
        className="rounded-xl border border-white/10 p-2 transition hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        title="Démarrer"
      >
        <Play size={16} />
      </button>

      <button
        onClick={() => stop.mutate()}
        disabled={stop.isPending}
        className="rounded-xl border border-white/10 p-2 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        title="Arrêter"
      >
        <Square size={16} />
      </button>

      <button
        onClick={() => restart.mutate()}
        disabled={restart.isPending}
        className="rounded-xl border border-white/10 p-2 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        title="Redémarrer"
      >
        <RotateCw size={16} />
      </button>

      <button
        onClick={() => {
          if (
            confirm(
              "Voulez-vous vraiment supprimer définitivement ce conteneur ?"
            )
          ) {
            remove.mutate();
          }
        }}
        disabled={remove.isPending}
        className="rounded-xl border border-red-500/20 p-2 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        title="Supprimer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}