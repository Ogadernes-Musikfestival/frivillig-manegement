import { Omraade as PrismaOmraade } from "@/app/generated/prisma/enums";

export { PrismaOmraade };

export const OMRAADE_LABELS: Record<PrismaOmraade, string> = {
  [PrismaOmraade.HEGNVAGT]: "Hegn",
  [PrismaOmraade.KOKKEN]: "Køkken",
  [PrismaOmraade.OPSAETNING]: "Opsætning",
  [PrismaOmraade.NEDTAGNING]: "Nedtagning",
  [PrismaOmraade.DIVERSE]: "Diverse",
  [PrismaOmraade.BAR]: "Bar",
  [PrismaOmraade.LEGEPLADS]: "Legeplads",
  [PrismaOmraade.LEDIG]: "Ledig",
};

export const formatOmraade = (omraade: PrismaOmraade) =>
  OMRAADE_LABELS[omraade];

export function formatTime(date: Date) {
  return date.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
