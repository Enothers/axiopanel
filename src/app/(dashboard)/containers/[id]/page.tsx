"use client";

import { useParams } from "next/navigation";

import { DockerDetails } from "@/components/docker/docker-details";
import { DockerEnv } from "@/components/docker/docker-env";
import { DockerLogs } from "@/components/docker/docker-logs";
import { DockerStats } from "@/components/docker/docker-stats";

import { useContainer } from "@/hooks/use-container";

export default function ContainerPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: container,
    isLoading,
  } = useContainer(id);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (!container) {
    return (
      <div className="flex h-64 items-center justify-center">
        Conteneur introuvable.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {container.name}
        </h1>

        <p className="text-neutral-400">
          {container.image}
        </p>
      </div>

      <DockerDetails container={container} />

      <DockerStats id={id} />

      <DockerEnv env={container.env} />

      <DockerLogs id={id} />
    </div>
  );
}