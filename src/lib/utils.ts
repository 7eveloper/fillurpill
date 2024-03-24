import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const alertMsg = (msg: string, addMsg: string) => {
  toast(`💊 ${msg}`, {
    description: addMsg,
  });
};

export const alertMsgWithAction = (msg: string, addMsg: string) => {
  toast(`💊 ${msg}`, {
    description: addMsg,
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
};

export const numbers = "0123456789".split("");
export const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
export const Capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const specialCh = "!@#$%^&*()_+-=[]{};\\'\\:\"|<>?,./`~.".split("");
