"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp } from "lucide-react";
import clsx from "clsx";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "orange" | "red";
}

const colors = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    icon: "text-green-400",
    badge: "bg-green-500/20 text-green-300",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300",
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: "text-red-400",
    badge: "bg-red-500/20 text-red-300",
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
}: StatsCardProps) {
  const c = colors[color];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "rounded-3xl border p-6 backdrop-blur-xl transition-all",
        "bg-white/5",
        c.border
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-400">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">{value}</h2>

          <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        </div>

        <div
          className={clsx(
            "rounded-2xl p-4",
            c.bg
          )}
        >
          <Icon className={c.icon} size={26} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">

        <span
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-medium",
            c.badge
          )}
        >
          Temps réel
        </span>

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <TrendingUp size={14} />
          Live
        </div>

      </div>
    </motion.div>
  );
}