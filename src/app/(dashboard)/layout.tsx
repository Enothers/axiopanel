import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,#18263e_0%,#07090D_45%,#050608_100%)]" />

      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25" />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col lg:ml-72">
          <Header />

          <main className="flex-1 px-5 py-6 md:px-8 lg:px-10">
            <div className="mx-auto w-full max-w-[1800px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}