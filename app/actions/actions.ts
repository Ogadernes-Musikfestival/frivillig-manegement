"use server";

import { PrismaOmraade } from "@/lib/constants";
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

export async function createShift(frivilligId: string, formData: FormData) {
  const festivalDate = "2026-05-09";

  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  await prisma.shift.create({
    data: {
      frivilligId,
      startTime: new Date(`${festivalDate}T${startTime}`),
      endTime: new Date(`${festivalDate}T${endTime}`),
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
