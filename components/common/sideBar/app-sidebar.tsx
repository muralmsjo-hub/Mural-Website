"use client";

import {
  Home,
  User2,
  ChevronUp,
  KeyRound,
  LayoutDashboard,
  Handshake,
  ClipboardList,
  FileCheck,
  BriefcaseBusiness,
  FolderTree,
  Image as ImageIcon,
  Package,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import SignOutComponent from "./SignOutComponent";
import Link from "next/link";
import Logo from "@/public/logo-noText.png";
import Image from "next/image";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/admin/dashboard/users", icon: User2 },
  { title: "Banners", url: "/admin/dashboard/banners", icon: ImageIcon },
  { title: "Categories", url: "/admin/dashboard/categories", icon: FolderTree },
  { title: "Products", url: "/admin/dashboard/products", icon: Package },
  {
    title: "Purchase Requests",
    url: "/admin/dashboard/purchase-order-requests",
    icon: ClipboardList,
  },
  {
    title: "Careers",
    url: "/admin/dashboard/careers",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    url: "/admin/dashboard/applications",
    icon: FileCheck,
  },
  { title: "Partners", url: "/admin/dashboard/partners", icon: Handshake },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const userName = (session?.user as any)?.firstName || "Admin";

  return (
    <Sidebar
      className="border-r border-[#0b8b99]/15 bg-[#04172e] text-slate-100"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-[#0b8b99]/15 bg-[#04172e] px-4 py-2.5 flex flex-row items-center gap-2 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b8b99]/15 border border-[#0b8b99]/30 shadow-xs shrink-0">
          <Image
            src={Logo.src}
            width={22}
            height={22}
            alt="Mural logo"
            className="object-contain"
          />
        </div>
        <span className="text-lg font-extrabold tracking-wide group-data-[state=collapsed]:hidden">
          <span className="text-white">Mur</span>
          <span className="text-[#0b8b99]">al</span>
        </span>
      </SidebarHeader>

      <SidebarContent className="bg-[#04172e] overflow-hidden scrollbar-hide">
        <SidebarGroup>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="gap-1.5 px-2 group-data-[state=collapsed]:px-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="group relative flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-[#0b8b99]/10 transition-all duration-200 rounded-lg border-l-2 border-transparent hover:border-[#0b8b99] group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 w-full group-data-[state=collapsed]:justify-center"
                    >
                      <item.icon
                        className="text-slate-400 group-hover:text-[#0b8b99] transition-colors shrink-0"
                        size={20}
                      />
                      <span className="text-sm font-medium group-data-[state=collapsed]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#0b8b99]/15 bg-[#031124] p-3 group-data-[state=collapsed]:p-2 group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip={userName}
                  className="
                    group flex h-12 w-full items-center gap-3 rounded-xl
                    bg-[#062b56]/40 hover:bg-[#062b56]
                    border border-[#0b8b99]/20 hover:border-[#0b8b99]/50
                    transition-all duration-200
                    px-2.5
                    group-data-[state=collapsed]:!h-10
                    group-data-[state=collapsed]:!w-10
                    group-data-[state=collapsed]:!p-0
                    group-data-[state=collapsed]:justify-center
                    group-data-[state=collapsed]:mx-auto
                  "
                >
                  {/* Avatar */}
                  <div
                    className="
                      flex items-center justify-center
                      rounded-full text-white bg-[#0b8b99]
                      font-semibold shadow-xs shrink-0
                      transition-all duration-200
                      h-8 w-8 text-xs
                    "
                  >
                    {userName[0]?.toUpperCase() +
                      (userName[1]?.toUpperCase() || "")}
                  </div>

                  {/* User info (hidden when collapsed) */}
                  <div
                    className="
                      flex flex-col items-start overflow-hidden
                      group-data-[state=collapsed]:hidden
                    "
                  >
                    <span className="text-xs font-semibold text-white truncate w-24">
                      {userName}
                    </span>
                    <span className="text-[10px] text-[#0b8b99] font-medium">
                      Administrator
                    </span>
                  </div>

                  {/* Chevron (hidden when collapsed) */}
                  <ChevronUp
                    size={14}
                    className="
                      ml-auto text-slate-400 transition-colors
                      group-hover:text-[#0b8b99]
                      group-data-[state=collapsed]:hidden
                    "
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              {/* Dropdown */}
              <DropdownMenuContent
                side="top"
                align="center"
                className="
            w-56 mb-2 rounded-xl
            border border-[#0b8b99]/20
            bg-[#04172e] text-slate-100
            p-1.5 shadow-xl backdrop-blur-md
          "
              >
                <DropdownMenuItem
                  className="
              rounded-lg cursor-pointer
              text-slate-300 hover:text-white
              hover:bg-[#0b8b99]/15
              group px-2 py-2
            "
                >
                  <Link
                    href="/change-password"
                    className="flex w-full items-center gap-2.5"
                  >
                    <KeyRound
                      size={16}
                      className="text-slate-400 group-hover:text-[#0b8b99] transition-colors"
                    />
                    <span className="text-xs font-medium">Change password</span>
                  </Link>
                </DropdownMenuItem>

                <div className="my-1 h-px bg-[#0b8b99]/15" />

                <DropdownMenuItem
                  className="
              rounded-lg cursor-pointer
              text-slate-300 hover:text-white
              hover:bg-[#0b8b99]/15
              px-2 py-2
            "
                >
                  <div className="group flex w-full items-center gap-2.5">
                    <SignOutComponent />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
