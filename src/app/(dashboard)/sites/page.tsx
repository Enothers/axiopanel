"use client";

import { useState } from "react";
import { Globe, Plus } from "lucide-react";

import { SitesTable } from "@/components/sites/sites-table";
import { CreateSiteDialog } from "@/components/sites/create-site-dialog";

export default function SitesPage() {
  const [open, setOpen] = useState(false);

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

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Nouveau site
        </button>

      </div>

      <SitesTable />

      <CreateSiteDialog
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}