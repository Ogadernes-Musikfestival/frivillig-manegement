import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: { omraade?: string };
};

const Sidebar = async ({ searchParams }: Props) => {
  const active = searchParams.omraade;

  const isActive = (value?: string) => active === value;
  const countFrivillige = await prisma.frivillig.count();
  const countLedige = await prisma.frivillig.count({
    where: {
      omraade: "LEDIG",
    },
  });

  const countHegn = await prisma.frivillig.count({
    where: {
      omraade: "HEGNVAGT",
    },
  });

  const countKokken = await prisma.frivillig.count({
    where: {
      omraade: "KOKKEN",
    },
  });

  const countBar = await prisma.frivillig.count({
    where: {
      omraade: "BAR",
    },
  });

  const countDiverse = await prisma.frivillig.count({
    where: {
      omraade: "DIVERSE",
    },
  });

  const countNed = await prisma.frivillig.count({
    where: {
      omraade: "NEDTAGNING",
    },
  });

  const countOp = await prisma.frivillig.count({
    where: {
      omraade: "OPSAETNING",
    },
  });

  const countLegeplads = await prisma.frivillig.count({
    where: {
      omraade: "LEGEPLADS",
    },
  });

  return (
    <aside className="px-8 col-span-12 flex justify-between items-center py-8 md:py-12">
      <ul className="flex flex-wrap text-black text-lg md:text-xl items-center gap-1 md:gap-4 ">
        <li>
          <Link href="/">
            <Button
              variant={!active ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5 text-lg md:text-xl font-normal"
            >
              Samlet antal
              <Badge className="bg-light text-dark">{countFrivillige}</Badge>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="?omraade=HEGNVAGT">
            <Button
              variant={isActive("HEGNVAGT") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Hegn
              <Badge className="bg-neon-hegn text-dark">{countHegn}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="?omraade=KOKKEN">
            <Button
              variant={isActive("KOKKEN") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Køkken
              <Badge className="bg-neon-koekken text-dark">{countKokken}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="?omraade=OPSAETNING">
            <Button
              variant={isActive("OPSAETNING") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Opsætning
              <Badge className="bg-neon-opsaetning text-dark">{countOp}</Badge>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="?omraade=NEDTAGNING">
            <Button
              variant={isActive("NEDTAGNING") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Nedtagning
              <Badge className="bg-neon-nedtagning text-dark">{countNed}</Badge>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="?omraade=BAR">
            <Button
              variant={isActive("BAR") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Bar
              <Badge className="bg-neon-bar text-dark">{countBar}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="?omraade=DIVERSE">
            <Button
              variant={isActive("DIVERSE") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Diverse
              <Badge className="bg-neon-diverse text-dark">
                {countDiverse}
              </Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="?omraade=LEGEPLADS">
            <Button
              variant={isActive("LEGEPLADS") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Legeplads
              <Badge className="bg-neon-legeplads text-dark">
                {countLegeplads}
              </Badge>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="?omraade=LEDIG">
            <Button
              variant={isActive("LEDIG") ? "default" : "outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Ledig
              <Badge className="bg-neon-ledig text-dark">{countLedige}</Badge>
            </Button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
