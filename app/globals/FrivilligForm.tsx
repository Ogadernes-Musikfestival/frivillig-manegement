"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createFrivillig } from "../actions/actions";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PrismaOmraade, OMRAADE_LABELS } from "@/lib/constants";

const FrivilligForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent full page reload
    const formData = new FormData(e.currentTarget);

    await createFrivillig(formData); // call your server action
    setIsOpen(false); // close the dialog
  };

  const omraadeOrder: PrismaOmraade[] = [
    PrismaOmraade.HEGNVAGT,
    PrismaOmraade.KOKKEN,
    PrismaOmraade.OPSAETNING,
    PrismaOmraade.NEDTAGNING,
    PrismaOmraade.DIVERSE,
    PrismaOmraade.BAR,
    PrismaOmraade.LEGEPLADS,
    PrismaOmraade.LEDIG, // always last
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white px-4 py-2">+ Frivillig</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md pt-16 pb-8">
        <form onSubmit={handleSubmit}>
          <DialogTitle className="mb-8">Opret Frivillig</DialogTitle>

          <FieldGroup className="mb-8">
            <Field>
              <FieldLabel>Navn</FieldLabel>
              <Input type="text" name="navn" required />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>

              <Input type="email" name="email" required />
            </Field>

            <Field>
              <FieldLabel>Evt. tlfnummer</FieldLabel>
              <Input type="text" name="telefon" />
            </Field>

            <Field>
              <FieldLabel>Område</FieldLabel>
              <FieldDescription>Vælg hold</FieldDescription>
              <select
                name="omraade"
                className="border rounded px-2 py-1 w-full"
              >
                {omraadeOrder.map((omraade) => (
                  <option key={omraade} value={omraade}>
                    {OMRAADE_LABELS[omraade]}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel>Andet?</FieldLabel>
              <Textarea
                name="kommentar"
                className="min-h-50"
                placeholder="Evt. kommentar..."
              />
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-3">
            <Button type="submit">Tilføj frivillig</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FrivilligForm;
