export const dynamic = "force-dynamic";
import { Omraade } from "@/app/generated/prisma/enums";

import PanelGridEntry from "./globals/PanelGridEntry";
import Sidebar from "./globals/Sidebar";

export default async function Home({
  searchParams,
}: {
  searchParams: { omraade?: string };
}) {
  const params = await searchParams;

  const omraadeParam = params.omraade;

  const omraade = Object.values(Omraade).includes(omraadeParam as Omraade)
    ? (omraadeParam as Omraade)
    : undefined;

  return (
    <main className="grid">
      <Sidebar searchParams={params} />
      <PanelGridEntry omraade={omraade} />
    </main>
  );
}
