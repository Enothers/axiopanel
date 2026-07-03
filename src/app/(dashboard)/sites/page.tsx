import { Globe, Plus } from "lucide-react";
import { SitesTable } from "@/components/sites/sites-table";

export default function SitesPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <div className="mb-2 flex items-center gap-3">

            <Globe
              size={32}
              className="text-blue-400"
            />

            <h1 className="text-3xl font-bold">
              Sites
            </h1>

          </div>

          <p className="text-neutral-400">
            Gérez tous vos sites web et domaines.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500">

          <Plus size={18} />

          Nouveau site

        </button>

      </div>

      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] py-24 text-center">

        <Globe
          className="mx-auto mb-6 text-neutral-500"
          size={60}
        />

        <h2 className="text-2xl font-semibold">
          <SitesTable />
        </h2>

        <p className="mt-2 text-neutral-500">
          Créez votre premier site hébergé avec AxioPanel.
        </p>

      </div>

    </div>
  );
}