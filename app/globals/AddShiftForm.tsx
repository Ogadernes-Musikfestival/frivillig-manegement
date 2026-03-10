"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createShift } from "../actions/actions";

export default function AddShiftForm({ frivilligId }: { frivilligId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await createShift(frivilligId, formData);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">+ Tider</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Tilføj tider</DialogTitle>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <label>Start</label>
            <input
              type="time"
              name="startTime"
              step={900}
              min="00:00"
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label>Slut</label>
            <input
              type="time"
              name="endTime"
              step={900}
              min="00:00"
              className="border p-2 w-full"
              required
            />
          </div>

          <Button type="submit">Gem vagt</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
