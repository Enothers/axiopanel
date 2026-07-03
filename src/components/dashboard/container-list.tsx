"use client";

import { motion } from "framer-motion";

interface Container {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
}

interface ContainerListProps {
  containers: Container[];
  isLoading?: boolean;
}

export function ContainerList({
  containers,
  isLoading = false,
}: ContainerListProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-neutral-400">
          Chargement des conteneurs...
        </p>
      </div>
    );
  }

  if (containers.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-neutral-400">
          Aucun conteneur trouvé.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Conteneurs Docker
        </h2>

        <span className="text-sm text-neutral-500">
          {containers.length} conteneur(s)
        </span>
      </div>

      <div className="space-y-3">
        {containers.map((container) => (
          <motion.div
            key={container.id}
            whileHover={{ x: 3 }}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 px-5 py-4 transition"
          >
            <div>
              <p className="font-medium">
                {container.name}
              </p>

              <p className="text-sm text-neutral-500">
                {container.image}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  container.state === "running"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <span className="text-sm capitalize text-neutral-300">
                {container.state}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}