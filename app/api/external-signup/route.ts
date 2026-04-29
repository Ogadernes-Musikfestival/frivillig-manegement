import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Omraade } from "@/app/generated/prisma/enums";
import { HEGN_SLOTS } from "@/lib/constants";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/velkommen";

const resend = new Resend(process.env.RESEND_API_KEY);

const frivilligSchema = z.object({
  navn: z.string().min(2, "Navn skal være mindst 2 karakterer"),
  email: z.string().email("Ugyldig email"),
  telefon: z.string().optional(),
  kommentar: z.string().optional(),
  omraade: z.enum(Omraade).optional(),
  slotId: z.string().optional(),
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

  const existing = await prisma.frivillig.findFirst({
    where: {
      email: validatedData.email,
    },
  });

  if (existing) {
    return NextResponse.json({
      success: true,
      message:
        "Tak fordi du forsøgte at tilmelde dig igen 🎉. Vi har virkelig brug for dig. Skriv venligst en mail til frivillig@oemfest.dk med hvilken opgave du gerne vil melde dig på. Tusind tak🙏",
    });
  }

  const frivillig = await prisma.frivillig.create({
    data: {
      navn: validatedData.navn,
      email: validatedData.email,
      telefon: validatedData.telefon ?? null,
      omraade: validatedData.omraade ?? Omraade.LEDIG,
      kommentar: validatedData.kommentar,
    },
  });

  if (validatedData.omraade === "HEGNVAGT" && validatedData.slotId) {
    const slot = HEGN_SLOTS.find((s) => s.id === validatedData.slotId);

    if (slot) {
      await prisma.shift.create({
        data: {
          startTime: slot.start,
          endTime: slot.end,
          frivilligId: frivillig.id,
        },
      });
    }
  }

  try {
    await resend.emails.send({
      from: "ØMFEST <noreply@mail.oemfest.dk>",
      to: validatedData.email,
      subject: "Tak for du vil hjælpe til ØMFEST 🎉",
      react: WelcomeEmail({ navn: validatedData.navn }),
    });
  } catch (err) {
    console.error("Email failed:", err);
    // 👈 IMPORTANT: don't break signup if email fails
  }

  return NextResponse.json({ success: true });
}
