"use server";

import { HEGN_SLOTS, PrismaOmraade } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  await prisma.note.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/");
}

export async function createFrivillig(formData: FormData) {
  await prisma.frivillig.create({
    data: {
      navn: formData.get("navn") as string,
      email: formData.get("email") as string,
      kommentar: formData.get("kommentar") as string,
      telefon: (formData.get("telefon") as string) || null,
      omraade: formData.get("omraade") as PrismaOmraade,
    },
  });

  revalidatePath("/");
}

export async function createShift(formData: FormData) {
  const frivilligId = formData.get("frivilligId") as string;
  const slotId = formData.get("slotId") as string;

  if (!frivilligId || !slotId) throw new Error("Missing frivilligId or slotId");

  const slot = HEGN_SLOTS.find((s) => s.id === slotId);
  if (!slot) throw new Error("Invalid slot");

  await prisma.shift.create({
    data: {
      frivilligId,
      startTime: slot.start,
      endTime: slot.end,
    },
  });

  revalidatePath("/");
}

export async function updateFrivillig(id: string, formData: FormData) {
  await prisma.frivillig.update({
    where: { id },
    data: {
      navn: formData.get("navn") as string,
      email: formData.get("email") as string,
      kommentar: formData.get("kommentar") as string,
      telefon: (formData.get("telefon") as string) || null,
      omraade: formData.get("omraade") as PrismaOmraade,
    },
  });

  revalidatePath("/");
}
