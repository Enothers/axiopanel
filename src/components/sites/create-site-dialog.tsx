"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateSiteDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateSiteDialog({
  open,
  onClose,
}: CreateSiteDialogProps) {
  const [form, setForm] = useState({
  name: "",
  domain: "",
  type: "docker",
  github: "",
  branch: "main",
  image: "",
  port: "3000",
  ssl: true,
});

  const queryClient = useQueryClient();

  const createSite = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Impossible de créer le site.");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sites"],
      });

      onClose();

      setForm({
  name: "",
  domain: "",
  type: "docker",
  github: "",
  branch: "main",
  image: "",
  port: "3000",
  ssl: true,
});
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-neutral-900 p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Nouveau site
        </h2>

        <div className="grid gap-5">

          <input
            className="rounded-xl border border-white/10 bg-white/5 p-3"
            placeholder="Nom du projet"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="rounded-xl border border-white/10 bg-white/5 p-3"
            placeholder="Domaine"
            value={form.domain}
            onChange={(e) =>
              setForm({
                ...form,
                domain: e.target.value,
              })
            }
          />

          <input
            className="rounded-xl border border-white/10 bg-white/5 p-3"
            placeholder="GitHub (optionnel)"
            value={form.github}
            onChange={(e) =>
              setForm({
                ...form,
                github: e.target.value,
              })
            }
          />

          <input
            className="rounded-xl border border-white/10 bg-white/5 p-3"
            placeholder="Branche"
            value={form.branch}
            onChange={(e) =>
              setForm({
                ...form,
                branch: e.target.value,
              })
            }
          />

          <div>

  <label className="mb-2 block text-sm font-medium">
    Type de projet
  </label>

  <select
    className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
    value={form.type}
    onChange={(e) =>
      setForm({
        ...form,
        type: e.target.value,
      })
    }
  >

    <option value="docker">
      🐳 Docker
    </option>

    <option value="nextjs">
      ▲ Next.js
    </option>

    <option value="node">
      🟢 Node.js
    </option>

    <option value="laravel">
      🚀 Laravel
    </option>

    <option value="php">
      🐘 PHP
    </option>

    <option value="static">
      🌐 Site statique
    </option>

  </select>

</div>

          <input
            className="rounded-xl border border-white/10 bg-white/5 p-3"
            placeholder="Image Docker (optionnel)"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
          />

          <input
            className="rounded-xl border border-white/10 bg-white/5 p-3"
            placeholder="Port"
            value={form.port}
            onChange={(e) =>
              setForm({
                ...form,
                port: e.target.value,
              })
            }
          />

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.ssl}
              onChange={(e) =>
                setForm({
                  ...form,
                  ssl: e.target.checked,
                })
              }
            />

            Activer Let's Encrypt

          </label>

        </div>

        <div className="mt-8 flex justify-end gap-3">

  <button
    onClick={onClose}
    className="rounded-xl border border-white/10 px-5 py-3 hover:bg-white/5"
  >
    Annuler
  </button>

  <button
    onClick={() => createSite.mutate()}
    disabled={createSite.isPending}
    className="rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500 disabled:opacity-50"
  >
    {createSite.isPending
      ? "Création..."
      : "Créer le site"}
  </button>

</div>

        </div>

      </div>

  );
}