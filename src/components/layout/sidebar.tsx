"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Boxes,
  Globe,
  Rocket,
  Database,
  Activity,
  ShieldCheck,
  ScrollText,
  Settings,
  Server,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Sites",
    href: "/sites",
    icon: Globe,
  },
  {
    title: "Docker",
    href: "/containers",
    icon: Boxes,
  },
  {
    title: "Déploiements",
    href: "/deployments",
    icon: Rocket,
  },
  {
    title: "Bases SQL",
    href: "/databases",
    icon: Database,
  },
  {
    title: "Monitoring",
    href: "/monitoring",
    icon: Activity,
  },
  {
    title: "SSL & Proxy",
    href: "/proxy",
    icon: ShieldCheck,
  },
  {
    title: "Logs",
    href: "/logs",
    icon: ScrollText,
  },
  {
    title: "Système",
    href: "/system",
    icon: Server,
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-white/5 backdrop-blur-2xl lg:flex lg:flex-col">

      {/* Logo */}

      <div className="border-b border-white/10 p-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 font-bold text-xl">
            A
          </div>

          <div>

            <h1 className="text-xl font-bold">
              AxioPanel
            </h1>

            <p className="text-sm text-neutral-400">
              Infrastructure Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-5">

        {navigation.map((item) => {

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          const Icon = item.icon;

          return (

            <Link
              key={item.href}
              href={item.href}
            >

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: .15 }}
                className={clsx(
                  "group relative flex items-center justify-between rounded-xl px-4 py-3 transition-all",
                  active
                    ? "bg-blue-500/20 text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
              >

                <div className="flex items-center gap-3">

                  <Icon
                    size={20}
                    className={clsx(
                      active && "text-blue-400"
                    )}
                  />

                  <span className="font-medium">
                    {item.title}
                  </span>

                </div>

                <ChevronRight
                  size={16}
                  className={clsx(
                    "transition",
                    active
                      ? "translate-x-0 opacity-100"
                      : "opacity-0 group-hover:opacity-60"
                  )}
                />

                {active && (

                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-blue-500"
                  />

                )}

              </motion.div>

            </Link>

          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-white/10 p-5">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />

            <div>

              <p className="font-medium">
                AxioWeb
              </p>

              <p className="text-xs text-neutral-500">
                VPS Production
              </p>

            </div>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-xs text-neutral-500">
              Version
            </span>

            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
              v0.1
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}