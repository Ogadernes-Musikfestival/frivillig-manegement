import { formatOmraade, OMRAADE_BG_COLORS } from "@/lib/constants";
import { Omraade } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";

import EditFrivilligForm from "./EditFrivilligForm";
import AddShift from "./AddShift";
import EditShift from "./EditShift";

type Props = {
  omraade?: Omraade;
};

export default async function PanelGridEntry({ omraade }: Props) {
  const frivillige = await prisma.frivillig.findMany({
    where: omraade ? { omraade: omraade as Omraade } : {},
    include: {
      shifts: {
        orderBy: {
          startTime: "asc",
        },
      },
    },
    orderBy: {
      omraade: "asc",
    },
  });

  const sortedFrivillige =
    omraade === "HEGNVAGT"
      ? [...frivillige].sort((a, b) => {
          const aTime = a.shifts[0]?.startTime ?? "99:99"; // volunteers without a shift go last
          const bTime = b.shifts[0]?.startTime ?? "99:99";
          return aTime.localeCompare(bTime);
        })
      : frivillige;

  return (
    <div className="grid col-span-12">
      {sortedFrivillige.map((frivillig, index) => (
        <div
          className="border-t-2 px-8 pt-8 pb-5 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-y-1 md:gap-x-4 items-start"
          key={frivillig.id}
        >
          <div className="flex items-center gap-2 md:order-2">
            <p className="font-extralight text-md md:hidden">{index + 1}</p>
            <h4>{frivillig.navn}</h4>
          </div>

          <div className="flex gap-2 items-center max-sm:mb-2 md:order-1">
            <p className="font-extralight text-sm pr-2 hidden md:block border-r-2">
              {index + 1}
            </p>
            <div
              className={`
              ${OMRAADE_BG_COLORS[frivillig.omraade]} 
              py-1 
              px-2 
              rounded-sm 
              inline-block
              shadow-sm
            `}
            >
              <p className="text-sm">{formatOmraade(frivillig.omraade)}</p>
            </div>
            <div className="flex flex-col text-sm font-semibold">
              {frivillig.shifts.length > 0
                ? frivillig.shifts.map((shift) => (
                    <EditShift key={shift.id} shift={shift} />
                  ))
                : frivillig.omraade === "HEGNVAGT" && (
                    <AddShift frivilligId={frivillig.id} />
                  )}
            </div>
          </div>

          <div className="flex md:order-3 xl:col-span-2">
            <p className="text-sm font-extralight italic">
              {frivillig.kommentar}
            </p>
          </div>

          <div className="hidden xl:flex flex-col gap-1 xl:order-4">
            <p className="text-sm font-extralight">{frivillig.email}</p>

            {frivillig.telefon && (
              <p className="text-sm font-extralight">
                tlf: {frivillig.telefon}
              </p>
            )}
          </div>

          <div className="max-md:grid justify-items-end md:order-4 md:col-start-4 xl:col-start-7">
            <div className="flex justify-center items-center">
              <EditFrivilligForm frivillig={frivillig} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
