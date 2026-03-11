import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Omraade } from "@/app/generated/prisma/enums";

const frivilligSchema = z.object({
  navn: z.string().min(2, "Navn skal være mindst 2 karakterer"),
  email: z.string().email("Ugyldig email"),
  telefon: z.string().optional(),
  kommentar: z.string().optional(),
  omraade: z.enum(Omraade).optional(),
});

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.EXTERNAL_SIGNUP_API_KEY}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const result = frivilligSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Ugyldige data" }, { status: 400 });
  }

  const validatedData = result.data;

  await prisma.frivillig.create({
    data: {
      navn: validatedData.navn,
      email: validatedData.email,
      telefon: validatedData.telefon ?? null,
      omraade: validatedData.omraade ?? Omraade.LEDIG,
      kommentar: validatedData.kommentar,
    },
  });

  return NextResponse.json({ success: true });
}
