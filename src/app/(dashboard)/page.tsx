"use client";

import {
  Activity,
  Boxes,
  Database,
  Globe,
} from "lucide-react";

import { StatsCard } from "@/components/dashboard/stats-card";
import { ContainerList } from "@/components/dashboard/container-list";
import { SystemChart } from "@/components/charts/system-chart";

import { useContainers } from "@/hooks/use-containers";
import { useSystem } from "@/hooks/use-system";
import { useSystemHistory } from "@/hooks/use-system-history";
import { useClock } from "@/hooks/use-clock";

import { formatUptime } from "@/lib/format-uptime";

export default function DashboardPage() {
  const {
    data: containers = [],
    isLoading,
  } = useContainers();

  const { data: system } = useSystem();

  const history = useSystemHistory();

  const clock = useClock();

  return (
    <div className="space-y-8">

      <section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold tracking-tight">
            Bonjour Lucas 👋
          </h1>

          <p className="mt-2 text-neutral-400">
            Bienvenue sur AxioPanel.
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-right backdrop-blur-xl">

          <p className="text-sm text-neutral-400">
            Serveur
          </p>

          <p className="font-medium">
            {system?.hostname ?? "..."}
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            {clock.toLocaleDateString("fr-FR")} •{" "}
            {clock.toLocaleTimeString("fr-FR")}
          </p>

        </div>

      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Conteneurs"
          value={containers.length}
          subtitle="Services Docker"
          icon={Boxes}
          color="blue"
        />

        <StatsCard
          title="Sites"
          value="2"
          subtitle="Sites hébergés"
          icon={Globe}
          color="green"
        />

        <StatsCard
          title="Bases SQL"
          value="3"
          subtitle="MariaDB"
          icon={Database}
          color="orange"
        />

        <StatsCard
          title="Disponibilité"
          value="100%"
          subtitle="Infrastructure"
          icon={Activity}
          color="green"
        />

      </section>

      <section className="grid gap-6 xl:grid-cols-3">

        <div className="space-y-6 xl:col-span-2">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h2 className="mb-6 text-lg font-semibold">
              Utilisation du serveur
            </h2>

            <SystemChart data={history} />

          </div>

          <ContainerList
            containers={containers}
            isLoading={isLoading}
          />

        </div>

        <aside className="space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

  <h2 className="mb-5 text-lg font-semibold">
    Ressources VPS
  </h2>

  <div className="space-y-6">

    <div>

      <div className="mb-2 flex justify-between text-sm">
        <span>CPU</span>
        <span>{system?.cpu ?? 0}%</span>
      </div>

      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all duration-500"
          style={{
            width: `${system?.cpu ?? 0}%`,
          }}
        />
      </div>

    </div>

    <div>

      <div className="mb-2 flex justify-between text-sm">
        <span>Mémoire</span>

        <span>
          {system?.memory.used ?? 0} / {system?.memory.total ?? 0} Go
        </span>

      </div>

      <div className="h-2 rounded-full bg-white/10">

        <div
          className="h-2 rounded-full bg-green-500 transition-all duration-500"
          style={{
            width: `${
              system
                ? (system.memory.used / system.memory.total) * 100
                : 0
            }%`,
          }}
        />

      </div>

    </div>

    <div>

      <div className="mb-2 flex justify-between text-sm">
        <span>Disque</span>

        <span>
          {system?.disk.percent ?? 0}%
        </span>

      </div>

      <div className="h-2 rounded-full bg-white/10">

        <div
          className="h-2 rounded-full bg-orange-500 transition-all duration-500"
          style={{
            width: `${system?.disk.percent ?? 0}%`,
          }}
        />

      </div>

    </div>

  </div>

</div>

<div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

  <h2 className="mb-5 text-lg font-semibold">
    Informations système
  </h2>

  <div className="space-y-4 text-sm">

    <div className="flex justify-between">
      <span>Serveur</span>
      <span>{system?.hostname}</span>
    </div>

    <div className="flex justify-between">
      <span>Système</span>
      <span>{system?.platform}</span>
    </div>

    <div className="flex justify-between">
      <span>CPU</span>
      <span>{system?.cores} cœurs</span>
    </div>

    <div className="flex justify-between">
      <span>Charge</span>
      <span>{system?.load?.[0].toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <span>Uptime</span>
      <span>
        {system
          ? formatUptime(system.uptime)
          : "-"}
      </span>
    </div>

  </div>

</div>

<div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

  <h2 className="mb-5 text-lg font-semibold">
    Services
  </h2>

  <div className="space-y-3">

    {system?.services.map((service) => (

      <div
        key={service.name}
        className="flex items-center justify-between"
      >

        <span className="capitalize">
          {service.name}
        </span>

        <div className="flex items-center gap-2">

          <div
            className={`h-2.5 w-2.5 rounded-full ${
              service.online
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          <span className="text-sm">
            {service.online
              ? "En ligne"
              : "Hors ligne"}
          </span>

        </div>

      </div>

    ))}

  </div>

</div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h2 className="mb-5 text-lg font-semibold">
              Activité récente
            </h2>

            <div className="space-y-4">

              <ActivityItem
                title="AxioPanel démarré"
                time="Aujourd'hui"
                color="bg-green-500"
              />

              <ActivityItem
                title={`${containers.length} conteneur(s) détecté(s)`}
                time="Temps réel"
                color="bg-blue-500"
              />

              <ActivityItem
                title="Surveillance système active"
                time="Toutes les 5 secondes"
                color="bg-orange-500"
              />

            </div>

          </div>

        </aside>

      </section>

    </div>
  );
}

interface ActivityItemProps {
  title: string;
  time: string;
  color: string;
}

function ActivityItem({
  title,
  time,
  color,
}: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4">

      <div
        className={`h-3 w-3 rounded-full ${color}`}
      />

      <div>

        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="text-xs text-neutral-500">
          {time}
        </p>

      </div>

    </div>
  );
}