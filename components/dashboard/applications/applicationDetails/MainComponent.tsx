"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationInfoGrid from "./ApplicationInfoGrid";
import { ApplicationByIdWithCareer } from "@/server/applications/types";

interface Props {
  applicationDetails: ApplicationByIdWithCareer & { id?: string };
  markApplicationAsShownAction: (
    id: string
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function ApplicationDetailsClient({
  applicationDetails,
  markApplicationAsShownAction,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkAsShown = async () => {
    if (!applicationDetails.id) return;
    setLoading(true);
    try {
      const result = await markApplicationAsShownAction(applicationDetails.id);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error updating application status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50/70 min-h-screen pb-12">
      <ApplicationHeader
        isShown={!!applicationDetails.isShown}
        onMarkAsShown={handleMarkAsShown}
        loading={loading}
      />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-20">
            <ApplicationSidebar application={applicationDetails} />
          </div>

          {/* Right: Detailed Content */}
          <div className="lg:col-span-8">
            <ApplicationInfoGrid application={applicationDetails} />
          </div>
        </div>
      </main>
    </div>
  );
}

