"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    cpu: number;
    ram: number;
  }[];
}

export function SystemChart({
  data,
}: Props) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            dataKey="cpu"
            stroke="#3b82f6"
            dot={false}
          />

          <Line
            dataKey="ram"
            stroke="#22c55e"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}