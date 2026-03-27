export const dynamic = "force-dynamic";
import { Omraade } from "@/app/generated/prisma/enums";

import PanelGridEntry from "./globals/PanelGridEntry";
import Sidebar from "./globals/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignInForm from "./globals/SignInForm";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { omraade?: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await searchParams;

  const omraadeParam = params.omraade;

  const omraade = Object.values(Omraade).includes(omraadeParam as Omraade)
    ? (omraadeParam as Omraade)
    : undefined;

  if (!session) {
    return (
      <main className="h-dvh flex items-center justify-center">
        <div className="space-y-8">
          <Image
            src="/marker.svg"
            alt="Øgadernes musikfestival"
            height={48}
            width={48}
            className="mx-auto"
          />
          <SignInForm />
        </div>
      </main>
    );
  }

  return (
    <main className="grid">
      <Sidebar searchParams={params} />
      <PanelGridEntry omraade={omraade} />
    </main>
  );
}
