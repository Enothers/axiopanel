interface DockerEnvProps {
  env: string[];
}

export function DockerEnv({
  env,
}: DockerEnvProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Variables d'environnement
      </h2>

      <div className="space-y-2">
        {env.length === 0 ? (
          <p className="text-sm text-neutral-400">
            Aucune variable.
          </p>
        ) : (
          env.map((variable) => (
            <div
              key={variable}
              className="rounded-lg bg-black/30 p-2 font-mono text-xs"
            >
              {variable}
            </div>
          ))
        )}
      </div>
    </div>
  );
}