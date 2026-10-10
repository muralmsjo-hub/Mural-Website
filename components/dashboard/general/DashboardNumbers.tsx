import Link from "next/link";
import {
  Package,
  BriefcaseBusiness,
  FileText,
  ClipboardList,
  ArrowUpRight,
  FileCheck,
} from "lucide-react";
import { DashboardNumbersType } from "@/server/general/types";

interface DashboardNumbersProps {
  numbers?: DashboardNumbersType | null;
}

export default function DashboardNumbers({ numbers }: DashboardNumbersProps) {
  const cards = [
    {
      title: "Number of products",
      count: numbers?.numberOfProducts ?? 0,
      href: "/admin/dashboard/products",
      icon: Package,
      subtitle: "Active catalog items",
      badgeText: "Inventory",
      accentColor: "from-[#0b8b99]/20 to-[#0b8b99]/5",
      iconColor: "text-[#0b8b99]",
      iconBg: "bg-[#0b8b99]/10 group-hover:bg-[#0b8b99] group-hover:text-white",
    },
    {
      title: "Number of careers",
      count: numbers?.numberOfCareers ?? 0,
      href: "/admin/dashboard/careers",
      icon: BriefcaseBusiness,
      subtitle: "Open positions listed",
      badgeText: "Recruitment",
      accentColor: "from-[#0b8b99]/20 to-[#0b8b99]/5",
      iconColor: "text-[#0b8b99]",
      iconBg: "bg-[#0b8b99]/10 group-hover:bg-[#0b8b99] group-hover:text-white",
    },
    {
      title: "Number of requests",
      count: numbers?.numberOfRequests ?? 0,
      href: "/admin/dashboard/purchase-order-requests",
      icon: ClipboardList,
      subtitle: "Purchase orders received",
      badgeText: "Purchase Orders",
      accentColor: "from-[#0b8b99]/20 to-[#0b8b99]/5",
      iconColor: "text-[#0b8b99]",
      iconBg: "bg-[#0b8b99]/10 group-hover:bg-[#0b8b99] group-hover:text-white",
    },
    {
      title: "Number of applications",
      count: numbers?.numberOfApplications ?? 0,
      href: "/admin/dashboard/applications",
      icon: FileCheck,
      subtitle: "Job applications received",
      badgeText: "Applicants",
      accentColor: "from-[#0b8b99]/20 to-[#0b8b99]/5",
      iconColor: "text-[#0b8b99]",
      iconBg: "bg-[#0b8b99]/10 group-hover:bg-[#0b8b99] group-hover:text-white",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center pl-4 justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Quick overview
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of products, requests, applications, and careers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#0b8b99]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle gradient background accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${card.iconBg} ${card.iconColor}`}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0b8b99]/10 group-hover:text-[#0b8b99] transition-colors duration-300">
                    {card.badgeText}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {card.count.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {card.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-[#0b8b99] transition-colors duration-300">
                <span>View details</span>
                <ArrowUpRight
                  size={16}
                  className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
