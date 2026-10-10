"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutComponent() {
  return (
    <DropdownMenuItem
      onClick={() => signOut({ callbackUrl: "/" })}
      className="group flex cursor-pointer items-center gap-2 text-sm text-gray-500 focus:text-white hover:text-white"
    >
      <LogOut
        className="h-4 w-4 text-gray-500 transition-colors group-hover:text-[#2383c9]"
      />
      <span className="transition-colors font-bold group-hover:text-white">
        Sign out
      </span>
    </DropdownMenuItem>
  );
}