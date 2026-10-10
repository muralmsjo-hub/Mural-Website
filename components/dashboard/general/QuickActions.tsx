import React from "react";
import Link from "next/link";
import {
  Package,
  Handshake,
  BriefcaseBusiness,
  ArrowRight,
  FolderTree,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add new category",
      href: "/admin/dashboard/categories/newCategory",
      icon: FolderTree,
      description: "Create a new product category",
      tag: "Catalog",
    },
    {
      title: "Add new product",
      href: "/admin/dashboard/products/newProduct",
      icon: Package,
      description: "Add a new product listing",
      tag: "Inventory",
    },
    {
      title: "Add new partner",
      href: "/admin/dashboard/partners/newPartner",
      icon: Handshake,
      description: "Register a new brand partner",
      tag: "Partners",
    },
    {
      title: "Add new Career",
      href: "/admin/dashboard/partners/newPartner",
      icon: BriefcaseBusiness,
      description: "Add a career opportunity",
      tag: "Careers",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pl-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Quick Actions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quick access to common tasks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={`${action.title}-${index}`}
              href={action.href}
              className="group relative p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:shadow-slate-200/50 hover:border-[#0b8b99]/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="h-11 w-11 rounded-xl bg-slate-100/80 text-slate-700 flex items-center justify-center group-hover:bg-[#0b8b99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                  <Icon size={20} />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 px-2 py-0.5 rounded-md bg-slate-100/60 group-hover:bg-[#0b8b99]/10 group-hover:text-[#0b8b99] transition-colors duration-200">
                  {action.tag}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#0b8b99] transition-colors duration-200">
                  {action.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0b8b99]">
                <span>Create now</span>
                <ArrowRight
                  size={15}
                  className="transform group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
