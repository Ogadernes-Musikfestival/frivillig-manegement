import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const noterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const noter = await prisma.note.findMany({
    where: {
      createdById: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="py-8 px-8 lg:px-24">
      <p>{session.user.name} Noter</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-8 pt-12 md:pt-24 pb-12">
        {noter.map((note) => (
          <div
            key={note.id}
            className="bg-[#FFFDF8] border-t-2 border-neonGreen p-8 space-y-4 shadow-sm"
          >
            <h4 className="text-base font-semibold">{note.title}</h4>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default noterPage;
