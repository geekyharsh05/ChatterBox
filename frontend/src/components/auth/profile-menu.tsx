"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/user-avatar";
import dynamic from "next/dynamic";
import Link from "next/link";
import { 
  LogOut, 
  User, 
  Settings 
} from "lucide-react";

// Dynamically import logout modal
const LogoutModal = dynamic(() => import("./logout-modal"), { 
  ssr: false 
});

interface ProfileMenuProps {
  image?: string;
  name: string;
}

export default function ProfileMenu({ 
  image, 
  name 
}: ProfileMenuProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  return (
    <>
      {logoutOpen && (
        <LogoutModal 
          open={logoutOpen} 
          setOpen={setLogoutOpen} 
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger 
          className="focus:outline-none group"
        >
          <UserAvatar 
            name={name} 
            image={image} 
            className="transition-transform duration-300 group-hover:scale-105 group-focus:scale-105 ring-2 ring-transparent group-hover:ring-primary/30 group-focus:ring-primary/30 rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 rounded-xl p-2 space-y-1"
        >
          <DropdownMenuLabel 
            className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1"
          >
            {name}'s Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator 
            className="bg-gray-200 dark:bg-gray-700 h-px my-1"
          />
          <DropdownMenuItem 
            asChild
            className="cursor-pointer"
          >
            <Link 
              href="/profile" 
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
            >
              <User 
                className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" 
              />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            asChild
            className="cursor-pointer"
          >
            <Link 
              href="/settings" 
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
            >
              <Settings 
                className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" 
              />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleLogoutClick}
            className="cursor-pointer"
          >
            <div 
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950 text-red-600 hover:text-red-800 transition-colors duration-200 group"
            >
              <LogOut 
                className="w-4 h-4 text-red-500 group-hover:text-red-700 transition-colors" 
              />
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}