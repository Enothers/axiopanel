"use client";

import type { DockerContainer } from "@/types/docker";

import { DockerActions } from "./docker-actions";
import { DockerStatus } from "./docker-status";

interface DockerRowProps {
  container: DockerContainer;
}

export function DockerRow({
  container,
}: DockerRowProps) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition">

      <td className="px-5 py-4">
        <DockerStatus state={container.state} />
      </td>

      <td className="px-5 py-4 font-medium">
        {container.name}
      </td>

      <td className="px-5 py-4 text-neutral-400">
        {container.image}
      </td>

      <td className="px-5 py-4">
        {container.network.join(", ")}
      </td>

      <td className="px-5 py-4">
        {container.ports.length}
      </td>

      <td className="px-5 py-4">
        {container.mounts.length}
      </td>

      <td className="px-5 py-4">
        <DockerActions />
      </td>

    </tr>
  );
}