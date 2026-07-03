"use client";

import Link from "next/link";
import {
  Globe,
  Lock,
  MoreHorizontal,
  Server,
} from "lucide-react";

import { useSites } from "@/hooks/use-sites";

export function SitesTable() {
  const {
    data = [],
    isLoading,
  } = useSites();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
        Chargement...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] py-24 text-center">

        <Server
          className="mx-auto mb-6 text-neutral-500"
          size={64}
        />

        <h2 className="text-2xl font-semibold">
          Aucun site
        </h2>

        <p className="mt-2 text-neutral-500">
          Créez votre premier site hébergé.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">

      <table className="w-full">

        <thead className="border-b border-white/10 bg-white/5">

          <tr>

            <th className="px-6 py-4 text-left">
              Statut
            </th>

            <th className="px-6 py-4 text-left">
              Nom
            </th>

            <th className="px-6 py-4 text-left">
              Domaine
            </th>

            <th className="px-6 py-4 text-left">
              SSL
            </th>

            <th className="px-6 py-4 text-left">
              Créé le
            </th>

            <th className="px-6 py-4 text-right">
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((site) => (

            <tr
              key={site.id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >

              <td className="px-6 py-5">

                <div className="flex items-center gap-2">

                  <div
                    className={`h-3 w-3 rounded-full ${
                      site.status === "online"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />

                  <span className="capitalize">
                    {site.status}
                  </span>

                </div>

              </td>

              <td className="px-6 py-5 font-medium">
                {site.name}
              </td>

              <td className="px-6 py-5">

                <Link
                  href={`https://${site.domain}`}
                  target="_blank"
                  className="flex items-center gap-2 text-blue-400 hover:underline"
                >

                  <Globe size={15} />

                  {site.domain}

                </Link>

              </td>

              <td className="px-6 py-5">

                {site.ssl_enabled ? (
                  <Lock
                    size={18}
                    className="text-green-500"
                  />
                ) : (
                  "-"
                )}

              </td>

              <td className="px-6 py-5">
                {site.created_at
                  ? new Date(site.created_at)
                      .toLocaleDateString("fr-FR")
                  : "-"}
              </td>

              <td className="px-6 py-5 text-right">

                <button className="rounded-lg p-2 hover:bg-white/10">

                  <MoreHorizontal size={18} />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}