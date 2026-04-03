"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OMRAADE_LABELS, PrismaOmraade } from "@/lib/constants";

import { useState } from "react";
import { deleteFrivillig, updateFrivillig } from "../actions/actions";

type EditFrivilligFormProps = {
  frivillig: {
    id: string;
    navn: string;
    email: string;
    telefon?: string | null;
    kommentar?: string | null;
    omraade: PrismaOmraade;
  };
};

const EditFrivilligForm = ({ frivillig }: EditFrivilligFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateFrivillig(frivillig.id, formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md pt-16 pb-8">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Frivillig</DialogTitle>

          <FieldGroup className="mb-8">
            <Field>
              <FieldLabel>Navn</FieldLabel>
              <Input type="text" name="navn" defaultValue={frivillig.navn} />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" name="email" defaultValue={frivillig.email} />
            </Field>

            <Field>
              <FieldLabel>Telefon</FieldLabel>
              <Input
                type="text"
                name="telefon"
                defaultValue={frivillig.telefon || ""}
              />
            </Field>

            <Field>
              <FieldLabel>Område</FieldLabel>
              <select name="omraade" defaultValue={frivillig.omraade}>
                {Object.values(PrismaOmraade).map((omraade) => (
                  <option key={omraade} value={omraade}>
                    {OMRAADE_LABELS[omraade]}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel>Kommentar</FieldLabel>
              <Textarea
                name="kommentar"
                defaultValue={frivillig.kommentar || ""}
              />
            </Field>
          </FieldGroup>

          <div className="flex justify-between items-end gap-3">
            <Button type="submit">Opdater</Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash className="w-4 h-4" />
                  <span className="sr-only">Slet</span>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogTitle>Er du sikker?</AlertDialogTitle>

                <AlertDialogDescription>
                  Denne handling kan ikke fortrydes. Dette vil permanent slette
                  den frivillige.
                </AlertDialogDescription>

                <div className="flex justify-end gap-2 mt-4">
                  <AlertDialogCancel>Annuller</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={async () => {
                      await deleteFrivillig(frivillig.id);
                      setIsOpen(false);
                    }}
                  >
                    Ja, slet
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFrivilligForm;
