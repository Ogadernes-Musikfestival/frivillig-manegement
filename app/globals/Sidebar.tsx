import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const Sidebar = async () => {
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
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Hegn
              <Badge>{countHegn}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Køkken
              <Badge>{countKokken}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Ledig
              <Badge>{countLedige}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Opsætning
              <Badge>{countOp}</Badge>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Nedtagning
              <Badge>{countNed}</Badge>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Bar
              <Badge>{countBar}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Diverse
              <Badge>{countDiverse}</Badge>
            </Button>
          </Link>
        </li>

        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Legeplads
              <Badge>{countLegeplads}</Badge>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="#">
            <Button
              variant={"outline"}
              size={"lg"}
              className="border border-primary mb-1 border-solid px-3 py-1.5  text-lg md:text-xl font-normal"
            >
              Samlet antal
              <Badge>{countFrivillige}</Badge>
            </Button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
