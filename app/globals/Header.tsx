import React from "react";

import Image from "next/image";

import NoteForm from "./NoteForm";

import { Avatar } from "@/components/ui/avatar";
import FrivilligForm from "./FrivilligForm";

const Header = () => {
  return (
    <header className="block sm:flex p-8 items-center justify-between border-b-3 border-primary">
      <div className="flex gap-4 items-center justify-center mb-8 sm:mb-0">
        <Image
          src="/marker.svg"
          alt="Øgadernes musikfestival"
          height={36}
          width={36}
        />

        <h2 className="text-lg font-semibold tracking-widest uppercase">
          Den ømme frivillige
        </h2>
      </div>

      <div className="flex items-center gap-4 justify-center">
        <FrivilligForm />
        <NoteForm />
        <Avatar
          size="lg"
          className="bg-secondary text-primary flex justify-center items-center"
        >
          J
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
