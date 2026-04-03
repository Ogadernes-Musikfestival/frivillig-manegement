"use server";

import { auth } from "@/lib/auth";
import { HEGN_SLOTS, PrismaOmraade } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createNote(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Du skal være logget ind for at oprette en note");
  }
  await prisma.note.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      createdById: session.user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/noter");
}

export async function createFrivillig(formData: FormData) {
  const name = formData.get("navn") as string;
  const makeEmail = formData.get("email") as string;

  const email =
    makeEmail && makeEmail.trim() !== ""
      ? makeEmail
      : `mangler-${name
          .toLocaleLowerCase()
          .replace(/\s+/g, ".")}-${Date.now()}@system.local`;

  await prisma.frivillig.create({
    data: {
      navn: name,
      email: email,
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

export async function updateShift(formData: FormData) {
  const shiftId = formData.get("shiftId") as string;
  const slotId = formData.get("slotId") as string;

  if (!shiftId || !slotId) {
    throw new Error("Missing shiftId or slotId");
  }

  const slot = HEGN_SLOTS.find((s) => s.id === slotId);
  if (!slot) throw new Error("Invalid slot");

  await prisma.shift.update({
    where: { id: shiftId },
    data: {
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

export async function deleteFrivillig(id: string) {
  await prisma.frivillig.delete({
    where: { id },
  });

  revalidatePath("/");
}
