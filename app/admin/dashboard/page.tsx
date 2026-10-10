import React from "react";
import { dashboardNumbers } from "@/server/general/services";
import DashboardNumbers from "@/components/dashboard/general/DashboardNumbers";
import QuickActions from "@/components/dashboard/general/QuickActions";
import { LayoutDashboard, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const response = await dashboardNumbers();
  const numbersData = response.data;

  return (
    <div className="space-y-10 pb-10 w-full px-6">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-[#062b56] to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-[#0b8b99]/20 blur-3xl" />
        <div className="absolute right-20 top-0 h-32 w-32 rounded-full bg-[#0b8b99]/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-white">
              Admin dashboard
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Welcome to Mural management overview. Monitor key platform
              statistics and launch creation workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Numbers Section */}
      <DashboardNumbers numbers={numbersData} />

      {/* Section 2: Quick Actions Section */}
      <QuickActions />
    </div>
  );
}
