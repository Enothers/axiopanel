"use client";

import {
  Boxes,
  Globe,
  Database,
  Activity,
} from "lucide-react";

import { StatsCard } from "@/components/dashboard/stats-card";
import { ContainerList } from "@/components/dashboard/container-list";
import { useContainers } from "@/hooks/use-containers";

export default function DashboardPage() {
  const {
    data: containers = [],
    isLoading,
  } = useContainers();

  return (
    <div className="space-y-8">
      {/* Statistiques */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Conteneurs"
          value={containers.length}
          subtitle="Tous les services Docker"
          icon={Boxes}
          color="blue"
        />

        <StatsCard
          title="Sites"
          value="2"
          subtitle="Sites actuellement hébergés"
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

      {/* Contenu principal */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ContainerList
            containers={containers}
            isLoading={isLoading}
          />
        </div>

        <aside className="space-y-6">
          {/* Ressources VPS */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-5 text-lg font-semibold">
              Ressources VPS
            </h2>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>CPU</span>
                  <span>18%</span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[18%] rounded-full bg-blue-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Mémoire</span>
                  <span>3.2 / 8 Go</span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[40%] rounded-full bg-green-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Disque</span>
                  <span>41%</span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[41%] rounded-full bg-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Activité */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-5 text-lg font-semibold">
              Activité récente
            </h2>

            <div className="space-y-4">
              <ActivityItem
                title="Déploiement AxioWeb"
                time="Il y a 2 min"
                color="bg-green-500"
              />

              <ActivityItem
                title="Sauvegarde MariaDB"
                time="Il y a 14 min"
                color="bg-blue-500"
              />

              <ActivityItem
                title="Renouvellement SSL"
                time="Aujourd'hui"
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
      <div className={`h-3 w-3 rounded-full ${color}`} />

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