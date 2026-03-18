"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HEGN_SLOTS } from "@/lib/constants";
import { createShift } from "../actions/actions";
import { useState } from "react";

export default function AddShift({ frivilligId }: { frivilligId: string }) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">+ Tider</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Tilføj tider</DialogTitle>

        <form action={createShift} className="flex flex-col gap-4 mt-4">
          {/* Hidden field for the frivillig id */}
          <input type="hidden" name="frivilligId" value={frivilligId} />

          <h4 className="mb-2 text-lg">Vælg tidspunkt</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {HEGN_SLOTS.map((slot) => (
              <label
                key={slot.id}
                className={`flex cursor-pointer items-center rounded-md border-2 p-2 
                  border-neonGreen
                  ${
                    selectedSlot === slot.id
                      ? "bg-neonGreen text-dark"
                      : "hover:bg-neonGreen"
                  }`}
              >
                <input
                  type="radio"
                  name="slotId"
                  value={slot.id}
                  className="hidden"
                  required
                  onChange={() => setSelectedSlot(slot.id)}
                  checked={selectedSlot === slot.id}
                />
                {slot.start} – {slot.end}
              </label>
            ))}
          </div>

          <Button type="submit">Gem vagt</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
