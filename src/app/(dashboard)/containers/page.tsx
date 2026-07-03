import { Boxes } from "lucide-react";

import { DockerTable } from "@/components/docker/docker-table";

export default function ContainersPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <Boxes
            size={32}
            className="text-blue-400"
          />

          <h1 className="text-3xl font-bold">
            Docker
          </h1>
        </div>

        <p className="text-neutral-400">
          Gérez tous vos conteneurs Docker depuis AxioPanel.
        </p>
      </div>

      <DockerTable />
    </div>
  );
}