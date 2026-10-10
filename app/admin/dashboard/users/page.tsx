import { getAllUsers } from "@/server/auth/services";
import { userColumns } from "@/components/dashboard/columns/users-columns";
import { DataTable } from "@/components/dashboard/data-table";
import { deleteUserAction } from "./(actions)/deleteUser";
import { AllUsers } from "@/server/auth/types";
import { User2 } from "lucide-react";

export default async function UsersTable() {
  const result = await getAllUsers();
  const users = (result.data || []) as AllUsers[];

  return (
    <main className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#062b56] flex items-center gap-2">
            <User2 className="h-6 w-6 text-[#0b8b99]" />
            <span>Users</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage user accounts, roles, permissions, and administrative access.
          </p>
        </div>
      </div>

      {/* Table container */}
      <DataTable
        columns={userColumns}
        data={users}
        routeName="users"
        deleteAction={deleteUserAction}
      />
    </main>
  );
}
