"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  HardDrive,
  Network,
} from "lucide-react";

import type { DockerContainer } from "@/types/docker";

import { DockerActions } from "./docker-actions";
import { DockerStatus } from "./docker-status";

interface DockerCardProps {
  container: DockerContainer;
}

export function DockerCard({
  container,
}: DockerCardProps) {
  return (
    <Link href={`/containers/${container.id}`}>
      <motion.div
        whileHover={{ y: -3 }}
        className="rounded-xl border border-white/10 p-2 transition-all duration-200 hover:scale-105 hover:bg-blue-500/20"
      >
        <div className="flex items-start justify-between">
          <div>
            <DockerStatus state={container.state} />

            <h2 className="mt-3 text-xl font-semibold">
              {container.name}
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              {container.image}
            </p>
          </div>

          <DockerActions id={container.id} />
        </div>

<div className="mt-5 flex flex-wrap gap-2">
  {container.ports.map((port) => (
    <span
      key={`${port.privatePort}-${port.type}`}
      className="rounded-xl border border-white/10 p-2 transition-all duration-200 hover:scale-105 hover:bg-blue-500/20"
    >
      {port.publicPort ?? port.privatePort}
    </span>
  ))}
</div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Network size={16} />

            <span>
              {container.network.length
                ? container.network.join(", ")
                : "-"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HardDrive size={16} />

            <span>
              {container.mounts.length} volume(s) monté(s)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Cpu size={16} />

            <span>
              {container.ports.length} port(s) exposé(s)
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}