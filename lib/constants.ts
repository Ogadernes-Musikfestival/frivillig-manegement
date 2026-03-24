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
  { id: "1", start: "11:30", end: "13:30" },
  { id: "2", start: "13:00", end: "15:30" },
  { id: "3", start: "15:00", end: "17:30" },
  { id: "4", start: "17:00", end: "19:30" },
  { id: "5", start: "19:00", end: "21:30" },
  { id: "6", start: "21:00", end: "23:30" },
];

export const OMRAADE_BG_COLORS: Record<PrismaOmraade, string> = {
  [PrismaOmraade.HEGNVAGT]: "bg-neon-hegn",
  [PrismaOmraade.KOKKEN]: "bg-neon-koekken",
  [PrismaOmraade.OPSAETNING]: "bg-neon-cyan",
  [PrismaOmraade.NEDTAGNING]: "bg-neon-orange",
  [PrismaOmraade.BAR]: "bg-neon-pink",
  [PrismaOmraade.LEGEPLADS]: "bg-neon-lime",
  [PrismaOmraade.DIVERSE]: "bg-neon-magenta",
  [PrismaOmraade.LEDIG]: "bg-neon-turbo",
};
