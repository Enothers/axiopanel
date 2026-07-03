interface DockerStatusProps {
  state: string;
}

const colors = {
  running: "bg-green-500",
  exited: "bg-red-500",
  restarting: "bg-yellow-500",
  paused: "bg-orange-500",
  created: "bg-blue-500",
  dead: "bg-red-700",
};

export function DockerStatus({
  state,
}: DockerStatusProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          colors[state as keyof typeof colors] ??
          "bg-neutral-500"
        }`}
      />

      <span className="text-xs font-medium capitalize">
        {state}
      </span>
    </div>
  );
}