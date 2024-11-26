"use client";
import React, { useCallback } from "react";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useKeyboardShortcut } from "@/hooks/use-keyboard";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogoutModal({ open, setOpen }: LogoutModalProps) {
  const handleLogout = useCallback(async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast("An error occurred while trying to log out. Please try again.");
    }
  }, []);

  const shortcutKey = useKeyboardShortcut(open, handleLogout);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? This action will expire your current session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleLogout}
            className="group relative overflow-hidden bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all duration-300 ease-in-out"
          >
            <span className="flex items-center justify-center gap-2">
              <LogOut className="h-4 w-4 transition-transform group-hover:scale-110" />
              Continue
              <span className="ml-2 rounded-md bg-red-600/30 px-1.5 py-0.5 text-xs font-medium text-white/80 group-hover:bg-red-600/50 transition-colors duration-300">
                {shortcutKey} + Enter
              </span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <LogOut className="h-8 w-8 animate-ping" />
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}