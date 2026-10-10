"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface DeleteActionProps {
  ids: string[];
  deleteManyAction: (ids: string[]) => Promise<{
    message?: string;
    status: number;
  }>;
  onFinish?: () => void;
}

export default function BulkDeleteButton({
  ids,
  deleteManyAction,
  onFinish,
}: DeleteActionProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleBulkDelete() {
    if (ids.length === 0) return;

    setLoading(true);

    try {
      const result = await deleteManyAction(ids);
      if (result.status < 200 || result.status >= 300) {
        toast.error(result.message || "Error deleting selected items");
        return;
      }

      toast.success(`${ids.length} Item(s) deleted successfully`);
      if (onFinish) onFinish();
    } catch {
      toast.error("Error In Deleting The Selected Fields");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* BUTTON THAT OPENS THE DIALOG */}
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={ids.length === 0}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Delete ({ids.length})
        </Button>
      </DialogTrigger>

      {/* CONFIRMATION DIALOG */}
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="text-black">Confirm Delete</DialogTitle>
          <DialogDescription className="text-gray-700">
            Are you sure you want to delete {ids.length} item(s)?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          {/* Cancel Button */}
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="bg-gray-200  hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </Button>

          {/* Confirm Button */}
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
