"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HEGN_SLOTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { updateShift } from "../actions/actions";

type Shift = {
  id: string;
  startTime: string;
  endTime: string;
};

export default function EditShift({ shift }: { shift: Shift }) {
  const currentSlot = HEGN_SLOTS.find(
    (s) => s.start === shift.startTime && s.end === shift.endTime
  );

  const [selectedSlot, setSelectedSlot] = useState<string | null>(
    currentSlot?.id ?? null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer hover:underline">
          {shift.startTime} - {shift.endTime}
        </p>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Hegnsvagt</DialogTitle>

        <form action={updateShift} className="flex flex-col gap-4 mt-4">
          <input type="hidden" name="shiftId" value={shift.id} />

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
                  checked={selectedSlot === slot.id}
                  onChange={() => setSelectedSlot(slot.id)}
                />
                {slot.start} – {slot.end}
              </label>
            ))}
          </div>

          <Button type="submit">Opdater vagt</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
