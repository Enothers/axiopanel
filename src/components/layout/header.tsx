"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Server,
  Activity,
  Cpu,
} from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07090D]/70 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-6 lg:px-10">

        {/* Partie gauche */}

        <div>

          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <p className="text-sm text-neutral-400">
            Gérez toute votre infrastructure depuis AxioPanel.
          </p>

        </div>

        {/* Partie droite */}

        <div className="flex items-center gap-4">

          {/* Recherche */}

          <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

            <Search
              size={18}
              className="text-neutral-500"
            />

            <input
              placeholder="Rechercher..."
              className="w-64 bg-transparent text-sm outline-none placeholder:text-neutral-500"
            />

          </div>

          {/* Status */}

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="hidden xl:flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-2"
          >

            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm">
              Infrastructure opérationnelle
            </span>

          </motion.div>

          {/* Monitoring */}

          <button className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">

            <Cpu size={18} />

          </button>

          <button className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">

            <Activity size={18} />

          </button>

          <button className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">

            <Bell size={18} />

          </button>

          {/* Profil */}

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">

              <Server size={18} />

            </div>

            <div className="hidden md:block">

              <p className="text-sm font-semibold">
                AxioWeb
              </p>

              <p className="text-xs text-neutral-400">
                Administrator
              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </header>
  );
}