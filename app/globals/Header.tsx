import React from "react";

import Image from "next/image";

import NoteForm from "./NoteForm";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FrivilligForm from "./FrivilligForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "../actions/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  user: {
    name?: string | null;
    email: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  const initial = (user.name || user.email).charAt(0).toUpperCase();
  return (
    <header className="block sm:flex py-8 px-8 lg:px-24 items-center justify-between border-b-3 border-primary">
      <Link
        href="/"
        className="flex gap-4 items-center justify-center mb-8 sm:mb-0"
      >
        <Image
          src="/marker.svg"
          alt="Øgadernes musikfestival"
          height={36}
          width={36}
        />

        <h2 className="text-lg font-semibold tracking-widest uppercase">
          Den ømme frivillige
        </h2>
      </Link>

      <div className="flex items-center gap-4 justify-center">
        <FrivilligForm />
        <NoteForm />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar
              size="lg"
              className="bg-secondary text-primary hover:opacity-80 transition-opacity cursor-pointer"
            >
              <AvatarFallback className="flex justify-center items-center font-bold">
                {initial}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <Link href="/noter">
                  <p className="text-sm font-medium leading-none">
                    {user.name || "Bruger"} noter
                  </p>
                </Link>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Using a form inside DropdownMenuItem to trigger Server Action */}
            <form action={signOutAction}>
              <button type="submit" className="w-full">
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log ud</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
