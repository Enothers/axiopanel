interface DockerDetailsProps {
  container: {
    id: string;
    image: string;
    state: string;
    status: string;
    created: number;
    network: string[];
    ports: {
      privatePort: number;
      publicPort?: number;
      type: string;
    }[];
    mounts: {
      source: string;
      destination: string;
    }[];
  };
}

export function DockerDetails({
  container,
}: DockerDetailsProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Informations
      </h2>

      <div className="space-y-4 text-sm">

        <div>
          <span className="font-medium">Image :</span>
          <p className="text-neutral-400">
            {container.image}
          </p>
        </div>

        <div>
          <span className="font-medium">Etat :</span>
          <p className="text-neutral-400">
            {container.state}
          </p>
        </div>

        <div>
          <span className="font-medium">Status :</span>
          <p className="text-neutral-400">
            {container.status}
          </p>
        </div>

        <div>
          <span className="font-medium">Créé le :</span>
          <p className="text-neutral-400">
            {new Date(container.created * 1000).toLocaleString()}
          </p>
        </div>

        <div>
          <span className="font-medium">Réseaux :</span>

          <div className="mt-2 flex flex-wrap gap-2">
            {container.network.map((network) => (
              <span
                key={network}
                className="rounded-lg bg-blue-500/10 px-2 py-1 text-xs"
              >
                {network}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="font-medium">Ports :</span>

          <div className="mt-2 flex flex-wrap gap-2">
            {container.ports.map((port) => (
              <span
                key={`${port.privatePort}-${port.type}`}
                className="rounded-lg bg-green-500/10 px-2 py-1 text-xs"
              >
                {port.publicPort ?? "-"} → {port.privatePort}/{port.type}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="font-medium">Volumes :</span>

          <div className="mt-2 space-y-2">
            {container.mounts.map((mount) => (
              <div
                key={`${mount.source}-${mount.destination}`}
                className="rounded-lg bg-black/20 p-2 text-xs"
              >
                {mount.source}

                <br />

                ↓

                <br />

                {mount.destination}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}