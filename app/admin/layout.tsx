import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/sideBar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "16rem",
          "--sidebar-width-icon": "4.5rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <main className="flex-1 min-h-screen min-w-0 overflow-hidden bg-white text-slate-900">
        <header className="sticky top-0 z-20 flex h-14 mb-4 items-center gap-4 border-b border-[#0b8b99]/15 bg-[#04172e] text-slate-100 px-6">
          <div className="flex items-center gap-2">
            <div className="hover:bg-[#0b8b99]/10 p-1 rounded-md transition-colors">
              <SidebarTrigger className="text-[#0b8b99] hover:text-[#0b8b99]/80 transition-transform hover:scale-110" />
            </div>
            <div className="h-4 w-px bg-[#0b8b99]/20 mx-2" />
            <nav className="flex items-center space-x-2 text-xs font-medium">
              <span className="text-slate-300">System</span>
              <span className="text-slate-500">/</span>
              <span className="text-[#0b8b99] font-semibold">Dashboard</span>
            </nav>
          </div>
        </header>

        <section className="relative z-10 flex-1  pb-8 animate-in fade-in duration-500">
          {children}
          <Toaster />
        </section>
      </main>
    </SidebarProvider>
  );
}
