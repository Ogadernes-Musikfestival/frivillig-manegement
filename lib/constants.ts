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

export const HEGN_SLOTS = [
  { id: "1", start: "10:30", end: "13:00" },
  { id: "2", start: "12:30", end: "15:00" },
  { id: "3", start: "14:30", end: "17:00" },
  { id: "4", start: "16:30", end: "19:00" },
  { id: "5", start: "18:30", end: "21:00" },
  { id: "6", start: "20:30", end: "23:00" },
];
