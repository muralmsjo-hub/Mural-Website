import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, User as UserIcon, Shield, IdCard } from "lucide-react";
import { getUserById } from "@/server/auth/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UpdateRoleForm from "@/components/dashboard/users/UpdateUserRoleForm";
import { updateUserRole } from "../(actions)/updateUser";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const result = await getUserById(id);

  if (!result || !result.data) {
    notFound();
  }

  const user = result.data;
  const isAdmin = user.role === "admin";

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Navigation & Header */}
      <div>
        <Link
          href="/admin/dashboard/users"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0b8b99] transition-colors mb-4 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to users</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#062b56]">
              Edit user profile
            </h1>
            <p className="text-sm text-slate-500">
              Manage permissions and view details for {user.name}
            </p>
          </div>
          <div>
            <Badge
              variant="outline"
              className={
                isAdmin
                  ? "bg-[#0b8b99]/10 text-[#0b8b99] border-[#0b8b99]/30 font-semibold px-3 py-1 text-xs"
                  : "bg-slate-100 text-slate-700 border-slate-200 font-semibold px-3 py-1 text-xs"
              }
            >
              {isAdmin ? "Admin role" : "User role"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Information Card */}
        <Card className="border border-slate-200 shadow-xs bg-white">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold text-[#062b56] flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-[#0b8b99]" />
              <span>User information</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Basic account details and current role status
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
              <Avatar className="h-14 w-14 border border-slate-200 shadow-xs">
                <AvatarFallback className="bg-[#062b56] text-[#0b8b99] font-bold text-xl">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-semibold text-slate-900 text-base">
                  {user.name || "Unnamed user"}
                </p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-slate-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email address</p>
                  <p className="text-sm text-slate-800 font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-slate-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Current role</p>
                  <p className="text-sm text-slate-800 font-medium capitalize">
                    {user.role}
                  </p>
                </div>
              </div>

            
            </div>
          </CardContent>
        </Card>

        {/* Edit Role Card */}
        <Card className="border border-slate-200 shadow-xs bg-white">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold text-[#062b56] flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#0b8b99]" />
              <span>Update user role</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Modify system permissions for this user account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <UpdateRoleForm
              userId={user.id}
              userRole={user.role}
              action={updateUserRole}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
