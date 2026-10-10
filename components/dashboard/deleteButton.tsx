"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  id: string;
  deleteAction: (id: string) => Promise<{
    message: string;
    status: number;
  }>;
  onFinish?: () => void;
}

export default function DeleteButton({
  id,
  deleteAction,
  onFinish,
}: DeleteButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const result = await deleteAction(id);
      if (result.status < 200 || result.status >= 300) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      if (onFinish) onFinish();
    } catch {
      toast.error("Error deleting item");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border-slate-300 cursor-pointer flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-600" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="text-black">Confirm Delete</DialogTitle>
          <DialogDescription className="text-gray-700">
            Are you sure you want to delete this item?
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
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </Button>

          {/* Confirm Button */}
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

