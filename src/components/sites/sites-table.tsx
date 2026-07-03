"use client";

import { useSites } from "@/hooks/use-sites";

export function SitesTable() {
  const {
    data = [],
    isLoading,
  } = useSites();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
        Chargement...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">

      <table className="w-full">

        <thead className="bg-white/5">

          <tr>

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
              Statut
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((site) => (
            <tr
              key={site.id}
              className="border-t border-white/10"
            >
              <td className="px-6 py-4">
                {site.name}
              </td>

              <td className="px-6 py-4">
                {site.domain}
              </td>

              <td className="px-6 py-4">
                {site.ssl ? "✅" : "❌"}
              </td>

              <td className="px-6 py-4">
                {site.status}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}