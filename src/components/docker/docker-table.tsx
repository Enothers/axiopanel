"use client";

import { useState } from "react";

import { useContainers } from "@/hooks/use-containers";

import { DockerCard } from "./docker-card";
import { DockerSearch } from "./docker-search";

export function DockerTable() {
  const {
    data: containers = [],
    isLoading,
  } = useContainers();

  const [search, setSearch] = useState("");

  const filtered = containers.filter((container) =>
    container.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <DockerSearch
        value={search}
        onChange={setSearch}
      />

      {isLoading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          Chargement...
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((container) => (
            <DockerCard
              key={container.id}
              container={container}
            />
          ))}
        </div>
      )}
    </div>
  );
}