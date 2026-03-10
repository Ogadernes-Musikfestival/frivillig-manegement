"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createNote } from "../actions/actions";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NoteForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent full page reload
    const formData = new FormData(e.currentTarget);

    await createNote(formData); // server action

    setIsOpen(false); // close the dialog
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white px-4 py-2">+ Note</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md pt-24 pb-8">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <p className="font-semibold text-sm">Skriv lille note</p>
            <DialogTitle>
              <Input type="text" name="title" placeholder="Evt. overskrift" />
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Textarea
                name="content"
                className="min-h-50"
                placeholder="Note..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit">Gem note</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;
